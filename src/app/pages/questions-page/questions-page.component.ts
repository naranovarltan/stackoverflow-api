import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StackoverflowService } from '../../services/search/stackoverflow.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { PathConfig } from '../../config/path.config';
import { QuestionInterface } from '../../interfaces/question.interface';
import { UserPostInterface } from '../../interfaces/user-post.interface';
import { QuickPanelParamsInterface } from '../../interfaces/quick-panel-params.interface';
import { OwnerInterface } from '../../interfaces/owner.interface';
import { QuickPanelType } from '../../types/quick-panel.type';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.less']
})
export class QuestionsPageComponent implements OnInit {

  public questions$: Observable<QuestionInterface[]>;
  public panelQuestions$: Observable<QuestionInterface[]>;
  public quickPanelParams$ = new BehaviorSubject<QuickPanelParamsInterface | null>(null);
  public isQuestionsLoading$ = new BehaviorSubject<boolean>(true);
  public isPanelQuestionsLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly stackoverflowService: StackoverflowService,
  ) { }

  ngOnInit(): void {
    this.initObservables();
  }

  public navigateToAnswers(id: number): void {
    this.router.navigate([`${PathConfig.QUESTIONS}/${id}`]);
  }

  public openPanelByUser({ user_id, display_name }: OwnerInterface, type: QuickPanelType): void {
    this.quickPanelParams$.next({ type, userId: user_id, info: `пользователю ${display_name}` });
  }

  public openPanelByTag(tag: string, type: QuickPanelType): void {
    this.quickPanelParams$.next({ type, tag, info: `тегу ${tag}` });
  }

  private initObservables(): void {
    this.questions$ = this.route.queryParams
      .pipe(
        map(({ search }: Params) => search),
        filter((search: string) => !!search),
        tap(() => this.isQuestionsLoading$.next(true)),
        switchMap((search: string) => this.stackoverflowService.search$(search)),
        tap(() => this.isQuestionsLoading$.next(false)),
      );

    this.panelQuestions$ = this.quickPanelParams$
      .pipe(
        filter((panelParams: QuickPanelParamsInterface | null) => !!panelParams),
        tap(() => this.isPanelQuestionsLoading$.next(true)),
        switchMap(({ type, userId, tag }: QuickPanelParamsInterface) =>
          type === 'user' ? this.getQuestionsByUserId$(userId) : this.getQuestionByTag$(tag),
        ),
        tap(() => this.isPanelQuestionsLoading$.next(false)),
      );
  }

  private getQuestionsPostIds(posts: UserPostInterface[]): number[] {
    return posts
      .filter(({ post_type }: UserPostInterface) => post_type === 'question')
      .map(({ post_id }: UserPostInterface) => post_id);
  }

  private getQuestionsByUserId$(userId: number): Observable<QuestionInterface[]> {
    return this.stackoverflowService.getUserPosts$(userId)
      .pipe(
        map((posts: UserPostInterface[]) => this.getQuestionsPostIds(posts)),
        switchMap((ids: number[]) => this.stackoverflowService.getQuestionsByIds$(ids)),
      );
  }

  private getQuestionByTag$(tag: string): Observable<QuestionInterface[]> {
    return this.stackoverflowService.getQuestionsByTag$(tag);
  }
}
