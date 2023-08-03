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
    console.log('Environment variables:', this.env);
    return this.requestService
      .request(this.env.apiUrl, 'GET', '/api/v5/app-table-designs', {
        'name.equals': tableId,
      })
      .pipe(
        map((res: any) => {
          try {
            const parsedData = JSON.parse(res.body[0]['tableDefinition']);
            return tableViewConfigSchema.parse(parsedData) as TableViewConfig;
          } catch (error) {
            throw new Error(`Data validation error: ${error}`);
          }
        })
      );
  }
}
