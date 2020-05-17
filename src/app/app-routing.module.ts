import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
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
    path: PathConfig.QUESTIONS,
    component: QuestionsPageComponent,
  },
  {
    path: `${PathConfig.QUESTIONS}/:question_id`,
    component: QuestionPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
