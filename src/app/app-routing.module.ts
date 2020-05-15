import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { ResultsSearchPageComponent } from './pages/results-search-page/results-search-page.component';
import { AnswerPageComponent } from './pages/answer-page/answer-page.component';
import { PathConfig } from './config/path.config';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: PathConfig.SEARCH,
    component: SearchPagesComponent,
  },
  {
    path: PathConfig.RESULTS_SEARCH,
    component: ResultsSearchPageComponent,
  },
  {
    path: PathConfig.ANSWERS,
    component: AnswerPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
