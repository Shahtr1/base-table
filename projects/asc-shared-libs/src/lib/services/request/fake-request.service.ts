import { Injectable } from '@angular/core';
import { IRequestService } from './irequest.service';
import { Observable } from 'rxjs';
import { HttpVerbs } from '../../model/lib.model';
import {
  getAccountPurposeData,
  getSelectData,
  testBaseTableData,
} from './fake-request-data';

@Injectable({
  providedIn: 'root',
})
export class FakeRequestService implements IRequestService {
  private testTableEntries = getAccountPurposeData();
  private testSelectData = getSelectData();

  request(
    method: HttpVerbs,
    route: string,
    data?: any,
    options?: any
  ): Observable<any> {
    const apiEndpoint = '';
    this.logData(apiEndpoint, method, route, data, options);
    let respData: any;
    if (route.includes('app-base-tables')) {
      respData = [{ viewConfig: JSON.stringify(testBaseTableData) }];
    } else if (route.includes('client-accounts')) {
      respData = this.testTableEntries;
    } else if (route.includes('select-url')) {
      respData = this.testSelectData;
    }

    return new Observable((observer) => {
      observer.next({
        body: respData,
        headers: new Map<string, number>([['x-total-count', 100]]),
      });
      observer.complete();
    });
  }

  private logData(
    apiEndpoint: string,
    method: HttpVerbs,
    route: string,
    data: any,
    options: any
  ) {
    console.log(
      'FakeRequestService: apiEndpoint: ',
      apiEndpoint,
      ' method: ',
      method,
      ' route: ',
      route,
      ' data: ',
      data,
      ' options: ',
      options
    );
  }
}
