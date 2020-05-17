import { Component, Input } from '@angular/core';
import { AnswerInterface } from '../../interfaces/answer.interface';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.less']
})
export class AnswersComponent {
  @Input() answers: AnswerInterface[];
  @Input() loading = true;
}
