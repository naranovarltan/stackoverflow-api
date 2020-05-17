import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StackoverflowService } from '../../services/search/stackoverflow.service';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { PathConfig } from '../../config/path.config';
import { QuestionInterface } from '../../interfaces/question.interface';
import { UserPostInterface } from '../../interfaces/user-post.interface';
import { QuickPanelParamsInterface } from '../../interfaces/quick-panel-params.interface';
import { OwnerInterface } from '../../interfaces/owner.interface';
import { QuickPanelType } from '../../types/quick-panel.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.less']
})
export class QuestionsPageComponent implements OnInit {
  public title$: Observable<string>;
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
    this.navigateTo(`${PathConfig.QUESTIONS}/${id}`);
  }

  public navigateToSearch(): void {
    this.navigateTo(PathConfig.SEARCH);
  }

  public openPanelByUser({ user_id, display_name }: OwnerInterface, type: QuickPanelType): void {
    this.quickPanelParams$.next({ type, userId: user_id, info: `пользователю ${display_name}` });
  }

  public openPanelByTag(tag: string, type: QuickPanelType): void {
    this.quickPanelParams$.next({ type, tag, info: `тегу ${tag}` });
  }

  private initObservables(): void {
    this.title$ = this.route.queryParams
      .pipe(
        map(({ search }: Params) => search),
        filter((search: string) => !!search),
      );
    this.questions$ = this.title$
      .pipe(
        tap(() => this.isQuestionsLoading$.next(true)),
        switchMap((search: string) => this.stackoverflowService.getQuestionsByTitle$(search)),
        tap(() => this.isQuestionsLoading$.next(false)),
        catchError((error: HttpErrorResponse) => {
          this.isQuestionsLoading$.next(false);

          return throwError(new Error(JSON.stringify(error)));
        }),
      );

    this.panelQuestions$ = this.quickPanelParams$
      .pipe(
        filter((panelParams: QuickPanelParamsInterface | null) => !!panelParams),
        tap(() => this.isPanelQuestionsLoading$.next(true)),
        switchMap(({ type, userId, tag }: QuickPanelParamsInterface) =>
          type === 'user' ? this.getQuestionsByUserId$(userId) : this.getQuestionByTag$(tag),
        ),
        tap(() => this.isPanelQuestionsLoading$.next(false)),
        catchError((error: HttpErrorResponse) => {
          this.isPanelQuestionsLoading$.next(false);

          return throwError(new Error(JSON.stringify(error)));
        }),
      );
  }

  private getQuestionsPostIds(posts: UserPostInterface[]): string[] {
    return posts
      .filter(({ post_type }: UserPostInterface) => post_type === 'question')
      .map(({ post_id }: UserPostInterface) => post_id.toString());
  }

  private getQuestionsByUserId$(userId: number): Observable<QuestionInterface[]> {
    return this.stackoverflowService.getUserPosts$(userId)
      .pipe(
        map((posts: UserPostInterface[]) => this.getQuestionsPostIds(posts)),
        switchMap((ids: string[]) => this.stackoverflowService.getQuestionsByIdOrIds$(ids)),
      );
  }

  private getQuestionByTag$(tag: string): Observable<QuestionInterface[]> {
    return this.stackoverflowService.getQuestionsByTag$(tag);
  }

  private navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
