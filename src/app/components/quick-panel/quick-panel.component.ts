import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionInterface } from '../../interfaces/question.interface';
import { OwnerInterface } from '../../interfaces/owner.interface';

@Component({
  selector: 'app-quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.less']
})
export class QuickPanelComponent {
  @Input() questions: QuestionInterface[];
  @Input() info: string;
  @Input() loading = false;

  @Output() navigateTo = new EventEmitter<number>();
  @Output() openPanelByUser = new EventEmitter<OwnerInterface>();
  @Output() openPanelByTag = new EventEmitter<string>();
}
