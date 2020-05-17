import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StackoverflowService } from '../../services/search/stackoverflow.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { PathConfig } from '../../config/path.config';
import { QuestionInterface } from '../../interfaces/question.interface';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.less']
})
export class QuestionsPageComponent implements OnInit {

  public questions$: Observable<QuestionInterface[]>;
  public panelOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly stackoverflowService: StackoverflowService,
  ) { }

  ngOnInit(): void {
    this.initSearch();
  }

  public navigateToAnswers(id: number): void {
    this.router.navigate([`${PathConfig.ANSWERS}/${id}`]);
  }

  public openPanelByUser(userId: number): void {
    this.panelOpened$.next(true);
  }

  public openPanelByTag(tag: string): void {
    this.panelOpened$.next(true);
  }

  private initSearch(): void {
    this.questions$ = this.route.queryParams
      .pipe(
        map(({ search }: Params) => search),
        filter((search: string) => !!search),
        switchMap((search: string) => this.stackoverflowService.search$(search)),
      );
  }
}
