import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { StackoverflowService } from '../../services/search/stackoverflow.service';
import { AnswerInterface } from '../../interfaces/answer.interface';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.less']
})
export class QuestionPageComponent implements OnInit {

  public answers$: Observable<AnswerInterface[]>;
  public isAnswersLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private route: ActivatedRoute, private stackoverflowService: StackoverflowService) {}

  ngOnInit() {
    this.initAnswersObservable();
  }

  private initAnswersObservable(): void {
    this.answers$ = this.route.params
      .pipe(
        map(({ question_id }: Params) => question_id),
        tap(() => this.isAnswersLoading$.next(true)),
        switchMap((question_id: string) => this.stackoverflowService.getAnswersByIds$(question_id)),
        tap(() => this.isAnswersLoading$.next(false)),
      );
  }
}
