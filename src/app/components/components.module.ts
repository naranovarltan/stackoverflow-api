import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { QuestionsComponent } from './questions/questions.component';
import { AnswersComponent } from './answers/answers.component';
import { QuestionComponent } from './question/question.component';

const COMPONENTS = [
  QuickPanelComponent,
  QuestionsComponent,
  AnswersComponent,
  QuestionComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
