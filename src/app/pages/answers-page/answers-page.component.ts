import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { SearchService } from '../../services/search/search.service';
import { AnswerInterface } from '../../interfaces/answer.interface';

@Component({
  selector: 'app-answers-page',
  templateUrl: './answers-page.component.html',
  styleUrls: ['./answers-page.component.less']
})
export class AnswersPageComponent implements OnInit {

  public answers$: Observable<AnswerInterface[]>;

  constructor(private route: ActivatedRoute, private searchService: SearchService) {}

  ngOnInit() {
    this.answers$ = this.route.params
      .pipe(
        map(({ question_id }: Params) => question_id),
        switchMap((question_id: string) => this.searchService.getAnswersByIds$(question_id)),
      );
  }
}
