import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionInterface } from '../../interfaces/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent {
  @Input() question: QuestionInterface;

  @Output() navigateTo = new EventEmitter<number>();
  @Output() openPanelByUser = new EventEmitter<number>();
  @Output() openPanelByTag = new EventEmitter<string>();
}
