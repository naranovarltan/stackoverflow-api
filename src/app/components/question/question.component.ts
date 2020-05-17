import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionInterface } from '../../interfaces/question.interface';
import { OwnerInterface } from '../../interfaces/owner.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.less']
})
export class QuestionComponent {
  @Input() question: QuestionInterface;

  @Output() navigateTo = new EventEmitter<number>();
  @Output() openPanelByUser = new EventEmitter<OwnerInterface>();
  @Output() openPanelByTag = new EventEmitter<string>();
}
