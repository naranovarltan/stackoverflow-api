import { QuestionInterface } from './question.interface';

export interface SearchResponseInterface {
  quota_max: number;
  quota_remaining: number;
  has_more: boolean;
  items: QuestionInterface[];
}
