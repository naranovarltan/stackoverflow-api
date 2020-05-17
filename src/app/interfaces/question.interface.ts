import { OwnerInterface } from './owner.interface';

export interface QuestionInterface {
  accepted_answer_id: number;
  answer_count: number;
  content_license: string;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  last_edit_date: number;
  link: string;
  owner: OwnerInterface;
  question_id: number;
  score: number;
  tags: string[];
  title: string;
  view_count: number;
}
