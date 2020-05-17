import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../interfaces/http-response.interface';
import { map } from 'rxjs/operators';
import { QuestionInterface } from '../../interfaces/question.interface';
import { AnswerInterface } from '../../interfaces/answer.interface';
import { UserPostInterface } from '../../interfaces/user-post.interface';
import { DEFAULT_QUERY_PARAMS, QUERY_IDS_SEPARATOR } from '../../config/constants';

@Injectable()
export class StackoverflowService {

  constructor(private http: HttpClient) {}

  private api = 'https://api.stackexchange.com/2.2';

  public getQuestionsByTitle$(intitle: string): Observable<QuestionInterface[]> {
    const params: Record<string, string | string[]> = { ...DEFAULT_QUERY_PARAMS, intitle, sort: 'votes' };

    return this.http.get<HttpResponseInterface<QuestionInterface>>(`${this.api}/search`, { params })
      .pipe(
        map(({ items }: HttpResponseInterface<QuestionInterface>) => items),
      );
  }

  public getAnswersByIds$(questionId: string): Observable<AnswerInterface[]> {
    const params: Record<string, string | string[]> = { ...DEFAULT_QUERY_PARAMS, filter: 'withbody' };

    return this.http.get<HttpResponseInterface<AnswerInterface>>(`${this.api}/questions/${questionId}/answers`, { params })
      .pipe(
        map(({ items }: HttpResponseInterface<AnswerInterface>) => items),
      );
  }

  public getUserPosts$(userId: number): Observable<UserPostInterface[]> {
    const params: Record<string, string | string[]> = { ...DEFAULT_QUERY_PARAMS };

    return this.http.get<HttpResponseInterface<UserPostInterface>>(`${this.api}/users/${userId}/posts`, { params })
      .pipe(
        map(({ items }: HttpResponseInterface<UserPostInterface>) => items),
      );
  }

  public getQuestionsByIdOrIds$(questionIds: string[]): Observable<QuestionInterface[]> {
    const params: Record<string, string | string[]> = { ...DEFAULT_QUERY_PARAMS, sort: 'votes' };
    const ids = questionIds.join(QUERY_IDS_SEPARATOR);

    return this.http.get<HttpResponseInterface<QuestionInterface>>(`${this.api}/questions/${ids}`, { params })
      .pipe(
        map(({ items }: HttpResponseInterface<QuestionInterface>) => items),
      );
  }

  public getQuestionsByTag$(tagged: string): Observable<QuestionInterface[]> {
    const params: Record<string, string | string[]> = { ...DEFAULT_QUERY_PARAMS, sort: 'hot', tagged };

    return this.http.get<HttpResponseInterface<QuestionInterface>>(`${this.api}/questions`, { params })
      .pipe(
        map(({ items }: HttpResponseInterface<QuestionInterface>) => items),
      );
  }
}
