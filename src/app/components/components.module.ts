import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { ResultsSearchComponent } from './results-search/results-search.component';
import { AnswersComponent } from './answers/answers.component';

const COMPONENTS = [
  QuickPanelComponent,
  ResultsSearchComponent,
  AnswersComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ComponentsModule {}
