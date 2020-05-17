import { UserPostType } from '../types/user-post.type';

export interface UserPostInterface {
  score: number;
  last_edit_date: number;
  last_activity_date: number;
  creation_date: number;
  post_type: UserPostType;
  post_id: number;
  content_license: string;
  link: string;
  body?: string;
}
