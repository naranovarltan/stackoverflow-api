import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { StackoverflowService } from '../../services/search/stackoverflow.service';
import { AnswerInterface } from '../../interfaces/answer.interface';
import { QuestionInterface } from '../../interfaces/question.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.less']
})
export class QuestionPageComponent implements OnInit {

  public question$: Observable<QuestionInterface>;
  public answers$: Observable<AnswerInterface[]>;
  public isAnswersLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private route: ActivatedRoute, private location: Location, private stackoverflowService: StackoverflowService) {}

  ngOnInit() {
    this.initObservables();
  }

  public navigateToPrevPage(): void {
    this.location.back();
  }

  private initObservables(): void {
    this.answers$ = this.route.params
      .pipe(
        filter((params: Params) => !!params),
        map(({ question_id }: Params) => question_id),
        tap(() => this.isAnswersLoading$.next(true)),
        switchMap((question_id: string) => this.stackoverflowService.getAnswersByIds$(question_id)),
        tap(() => this.isAnswersLoading$.next(false)),
        catchError((error: HttpErrorResponse) => {
          this.isAnswersLoading$.next(false);

          return throwError(new Error(JSON.stringify(error)));
        }),
      );

    this.question$ = this.route.params
      .pipe(
        filter((params: Params) => !!params),
        map(({ question_id }: Params) => question_id),
        switchMap((question_id: string) => this.stackoverflowService.getQuestionsByIdOrIds$([question_id])),
        map((questions: QuestionInterface[]) => questions && questions[0]),
      );
  }
}
