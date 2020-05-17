import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { AnswersPageComponent } from './pages/answers-page/answers-page.component';
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
    component: QuestionsPageComponent,
  },
  {
    path: `${PathConfig.ANSWERS}/:question_id`,
    component: AnswersPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
