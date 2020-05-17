import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search/search.service';
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
  public panelOpened$: Observable<boolean>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly searchService: SearchService,
  ) { }

  ngOnInit(): void {
    this.initSearch();
  }

  public navigateToAnswers(id: number): void {
    this.router.navigate([`${PathConfig.ANSWERS}/${id}`]);
  }

  public openPanelByUser(userId: number): void {

  }

  public openPanelByTag(tag: string): void {

  }

  private initSearch(): void {
    this.questions$ = this.route.queryParams
      .pipe(
        map(({ search }: Params) => search),
        filter((search: string) => !!search),
        switchMap((search: string) => this.searchService.search$(search)),
      );
  }
}
