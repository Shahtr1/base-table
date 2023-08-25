import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IRequestService } from './irequest.service';
import { HttpVerbs } from '../../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService implements IRequestService {
  private loggedIn = false;
  private token?: string = '';

  constructor(
    private http: HttpClient,
    @Inject('environment') public environment: any
  ) {}

  setLoggedIn(loggedIn: boolean, token?: string): void {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request(
    method: HttpVerbs,
    urlPath: string,
    data?: any,
    options: any = { rawBody: false }
  ): Observable<any> {
    const apiEndpoint = this.environment.apiUrl;
    if (method === 'GET') {
      return this.get(urlPath, data, options);
    }

    if (method === 'DELETE') {
      return this.http.request(method, apiEndpoint + urlPath, {
        responseType: 'json',
        observe: 'body',
      });
    }

    return this.http
      .request(
        method,
        apiEndpoint + urlPath,
        options.rawBody
          ? data
          : {
              body: data,
              responseType: 'json',
              observe: 'body',
            }
      )
      .pipe(retry(1));
  }

  private get(urlPath: string, data?: any, options?: any): Observable<any> {
    const apiEndpoint = this.environment.apiUrl;
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach((key) => {
        params = params.set(key, data[key]);
      });
    }

    return this.http
      .get(apiEndpoint + urlPath, {
        ...options,
        params,
        observe: 'response',
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
