import { Inject, Injectable } from '@angular/core';
import { RequestService } from './request/request.service';
import { map, Observable } from 'rxjs';
import { FakeRequestService } from './request/fake-request.service';
import { TableViewConfig } from '../model/table-config.model';
import { tableViewConfigSchema } from '../model/table-config.schema';

@Injectable({
  providedIn: 'root',
})
export class TableConfigService {
  constructor(
    private restApi: RequestService,
    private fakeRequestService: FakeRequestService,
    @Inject('environment') private env: any
  ) {}

  get requestService() {
    return this.env.isMockEnabled ? this.fakeRequestService : this.restApi;
  }

  load(tableId: string): Observable<TableViewConfig> | never {
    return this.requestService
      .request('GET', '/api/app-base-tables', {
        'name.equals': tableId,
      })
      .pipe(
        map((res: any) => {
          console.log('res', res);
          try {
            const parsedData = JSON.parse(res.body[0]['viewConfig']);
            console.log('parsedData', parsedData);
            return tableViewConfigSchema.parse(parsedData) as TableViewConfig;
          } catch (error) {
            throw new Error(`Data validation error: ${error}`);
          }
        })
      );
  }
}
