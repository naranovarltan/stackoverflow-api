import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionInterface } from '../../interfaces/question.interface';
import { OwnerInterface } from '../../interfaces/owner.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less']
})
export class QuestionsComponent {
  @Input() questions: QuestionInterface[];

  @Output() navigateTo = new EventEmitter<number>();
  @Output() openPanelByUser = new EventEmitter<OwnerInterface>();
  @Output() openPanelByTag = new EventEmitter<string>();
}
