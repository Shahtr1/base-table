import { Injectable } from '@angular/core';
import { IRequestService } from './irequest.service';
import { Observable } from 'rxjs';
import { HttpVerbs } from '../../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class FakeRequestService implements IRequestService {
  private testData = {
    settings: {
      url: '/api/v5/account-purposes',
      export: false,
      editButton: true,
      deleteButton: true,
      addButton: true,
      title: 'L_ACCOUNT_PURPOSE',
      transformData: true,
      editCallBack: true,
      newCallBack: true,
      softDelete: true,
    },
    columns: [
      { field: 'uuid', labelId: 'L_REF_ID', sort: true, filter: 'search' },
      {
        field: 'shortName',
        labelId: 'L_ACCOUNT_PURPOSE_SHORT_NAME',
        sort: true,
        filter: 'search',
      },
      {
        field: 'fullName',
        labelId: 'L_ACCOUNT_PURPOSE_FULL_NAME',
        sort: true,
        filter: 'search',
      },
      {
        field: 'workFlowStates',
        labelId: 'L_TRXN_STATUS',
        sourceUrl: '/api/v5/work-flow-states?size=20',
        optionLabel: 'desc',
        filter: 'select',
        filterDataKey: 'id',
        filterKey: 'workFlowStatesId',
        sort: true,
        type: 'select',
        translate: true,
      },
    ],
  };

  constructor() {}

  request(
    apiEndpoint: string,
    method: HttpVerbs,
    route: string,
    data?: any,
    options?: any
  ): Observable<any> {
    console.log('FakeRequestService.request()');
    return new Observable((observer) => {
      observer.next({
        body: [{ definition: JSON.stringify(this.testData) }],
      });
      observer.complete();
    });
  }
}
