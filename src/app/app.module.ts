import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { ResultsSearchPageComponent } from './pages/results-search-page/results-search-page.component';
import { AnswerPageComponent } from './pages/answer-page/answer-page.component';
import { ComponentsModule } from './components/components.module';

const COMPONENTS = [
  AppComponent,
  SearchPagesComponent,
  ResultsSearchPageComponent,
  AnswerPageComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
