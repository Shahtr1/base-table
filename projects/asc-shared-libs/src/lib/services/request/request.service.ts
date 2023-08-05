import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  setLoggedIn(loggedIn: boolean, token?: string): void {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request(
    apiEndpoint: string,
    method: HttpVerbs,
    route: string,
    data?: any,
    options: any = { rawBody: false }
  ): Observable<any> {
    if (method === 'GET') {
      return this.get(apiEndpoint, route, data, options);
    }

    if (method === 'DELETE') {
      return this.http.request(method, apiEndpoint + route, {
        responseType: 'json',
        observe: 'body',
      });
    }

    return this.http
      .request(
        method,
        apiEndpoint + route,
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

  private get(
    apiEndpoint: string,
    route: string,
    data?: any,
    options?: any
  ): Observable<any> {
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach((key) => {
        params = params.set(key, data[key]);
      });
    }

    return this.http
      .get(apiEndpoint + route, {
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
