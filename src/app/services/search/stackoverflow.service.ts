import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpResponseInterface } from '../../interfaces/http-response.interface';
import { map } from 'rxjs/operators';
import { QuestionInterface } from '../../interfaces/question.interface';
import { AnswerInterface } from '../../interfaces/answer.interface';

@Injectable()
export class StackoverflowService {

  constructor(private http: HttpClient) {
  }

  private api = 'https://api.stackexchange.com/2.2';

  public search$(searchValue: string): Observable<QuestionInterface[]> {
    const params: any = {
      page: '1',
      pagesize: '10',
      order: 'desc',
      sort: 'activity',
      tagged: searchValue,
      intitle: searchValue,
      site: 'stackoverflow',
    };

    return of({
      quota_max: 300,
      quota_remaining: 262,
      has_more: true,
      items: [
        {
          accepted_answer_id: 61848194,
          answer_count: 2,
          content_license: 'CC BY-SA 4.0',
          creation_date: 1589699010,
          is_answered: true,
          last_activity_date: 1589709794,
          last_edit_date: 1589702646,
          link: 'https://stackoverflow.com/questions/61848128/onclick-using-javascript',
          owner: {
            accept_rate: 100,
            display_name: 'Brad',
            link: 'https://stackoverflow.com/users/4383153/brad',
            profile_image: 'https://graph.facebook.com/796150084/picture?type=large',
            reputation: 31,
            user_id: 4383153,
            user_type: 'registered',
          },
          question_id: 61848128,
          score: 0,
          tags: ['javascript', 'jquery', 'ajax'],
          title: 'Onclick using Javascript',
          view_count: 43,
        },
        {
          accepted_answer_id: 61848194,
          answer_count: 2,
          content_license: 'CC BY-SA 4.0',
          creation_date: 1589699010,
          is_answered: true,
          last_activity_date: 1589709794,
          last_edit_date: 1589702646,
          link: 'https://stackoverflow.com/questions/61848128/onclick-using-javascript',
          owner: {
            accept_rate: 100,
            display_name: 'Brad',
            link: 'https://stackoverflow.com/users/4383153/brad',
            profile_image: 'https://graph.facebook.com/796150084/picture?type=large',
            reputation: 31,
            user_id: 4383153,
            user_type: 'registered',
          },
          question_id: 61848128,
          score: 0,
          tags: ['javascript', 'jquery', 'ajax'],
          title: 'Onclick using Javascript',
          view_count: 43,
        },
        {
          accepted_answer_id: 61848194,
          answer_count: 2,
          content_license: 'CC BY-SA 4.0',
          creation_date: 1589699010,
          is_answered: true,
          last_activity_date: 1589709794,
          last_edit_date: 1589702646,
          link: 'https://stackoverflow.com/questions/61848128/onclick-using-javascript',
          owner: {
            accept_rate: 100,
            display_name: 'Brad',
            link: 'https://stackoverflow.com/users/4383153/brad',
            profile_image: 'https://graph.facebook.com/796150084/picture?type=large',
            reputation: 31,
            user_id: 4383153,
            user_type: 'registered',
          },
          question_id: 61848128,
          score: 0,
          tags: ['javascript', 'jquery', 'ajax'],
          title: 'Onclick using Javascript',
          view_count: 43,
        }
      ]
    }).pipe(
      map(({ items }: HttpResponseInterface<QuestionInterface>) => items),
    );

    // return this.http.get(`${this.api}/search`, {params});
  }

  public getAnswersByIds$(questionId: string): Observable<AnswerInterface[]> {
    const params: any = {
      page: '1',
      pagesize: '10',
      order: 'desc',
      sort: 'activity',
      tagged: 'javascript',
      intitle: 'javascript',
      filter: 'withbody',
      site: 'stackoverflow',
    };

    return of({
      has_more: false,
      quota_max: 300,
      quota_remaining: 264,
      items: [{
        answer_id: 61849224,
        body: '',
        content_license: 'CC BY-SA 4.0',
        creation_date: 1589705406,
        is_accepted: true,
        last_activity_date: 1589705406,
        question_id: 61848087,
        score: 1,
      }]
    }).pipe(
      map(({ items }: HttpResponseInterface<AnswerInterface>) => items)
    );

    // return this.http.get(`${this.api}/questions/${questionId}/answers`, { params });
  }

  public getUserPosts$(userId: number): Observable<any> {
    const params: any = {
      page: '1',
      pagesize: '10',
      order: 'desc',
      sort: 'activity',
      tagged: 'javascript',
      intitle: 'javascript',
      site: 'stackoverflow',
    };

    return this.http.get(`${this.api}/users/${userId}/posts`, { params });
  }
}
