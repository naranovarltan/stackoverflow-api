import { AnswerInterface } from './answer.interface';

export interface AnswersResponseInterface {
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  items: AnswerInterface[];
}
