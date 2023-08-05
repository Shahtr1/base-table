import { Injectable } from '@angular/core';
import { IRequestService } from './irequest.service';
import { Observable, of } from 'rxjs';
import { HttpVerbs } from '../../model/lib.model';
import { TableViewConfig } from '../../model/table-config.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FakeRequestService implements IRequestService {
  private testBaseTableData: TableViewConfig = {
    settings: {
      url: '/api/v5/account-purposes',
      export: false,
      editButton: true,
      deleteButton: true,
      addButton: true,
      title: 'L_ACCOUNT_PURPOSE',
      transformData: true,
      editCallBack: true,
      addCallBack: true,
      softDelete: true,
      modifyConfig: true,
    },
    columns: [
      { field: 'uuid', headerId: 'L_REF_ID', sort: true, filter: 'search' },
      {
        field: 'shortName',
        headerId: 'L_ACCOUNT_PURPOSE_SHORT_NAME',
        sort: false,
        globalSearch: true,
        filter: 'search',
      },
      {
        field: 'fullName',
        headerId: 'L_ACCOUNT_PURPOSE_FULL_NAME',
        filter: 'search',
      },
      {
        field: 'workFlowStates',
        headerId: 'L_TRXN_STATUS',
        globalSearch: true,
        sourceUrl: '/api/v5/work-flow-states?size=20',
        optionLabel: 'desc',
        filter: 'select',
        sort: true,
        type: 'select',
        translate: true,
      },
    ],
  };

  private testAccountPurposeData: any[] = [];

  constructor() {
    this.createAccountPurposeData();
  }

  private createAccountPurposeData() {
    for (let i = 0; i < 100; i++) {
      this.testAccountPurposeData.push({
        uuid: 'uuid' + i,
        shortName: 'shortName' + i,
        fullName: 'fullName' + i,
        trxStatus: _.random(0, 1) === 1 ? 'ACTIVE' : 'INACTIVE',
      });
    }
  }

  request(
    apiEndpoint: string,
    method: HttpVerbs,
    route: string,
    data?: any,
    options?: any
  ): Observable<any> {
    this.logData(apiEndpoint, method, route, data, options);
    let respData: any;
    if (route.includes('app-table-designs')) {
      respData = [{ definition: JSON.stringify(this.testBaseTableData) }];
    } else if (route.includes('account-purpose')) {
      respData = this.testAccountPurposeData;
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
