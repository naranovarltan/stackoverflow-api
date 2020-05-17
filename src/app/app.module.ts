import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPagesComponent } from './pages/search-pages/search-pages.component';
import { QuestionsPageComponent } from './pages/questions-page/questions-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { ComponentsModule } from './components/components.module';
import { StackoverflowService } from './services/search/stackoverflow.service';

const COMPONENTS = [
  AppComponent,
  SearchPagesComponent,
  QuestionsPageComponent,
  QuestionPageComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [StackoverflowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
