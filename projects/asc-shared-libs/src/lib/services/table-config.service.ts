import { Inject, Injectable } from '@angular/core';
import { RequestService } from './request/request.service';
import { map, Observable } from 'rxjs';
import { FakeRequestService } from './request/fake-request.service';
import { z } from 'zod';
import { TableConfigSchema } from '../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class TableConfigService {
  private tableConfigSchema = z.object({
    tableConfig: z.object({
      url: z.string(),
      export: z.boolean().optional(),
    }),
    tableCols: z.array(
      z.object({
        field: z.string(),
        labelId: z.string(),
      })
    ),
  });

  constructor(
    private restApi: RequestService,
    private fakeRequestService: FakeRequestService,
    @Inject('environment') private env: any
  ) {}

  get requestService() {
    return this.env.isMockEnabled ? this.fakeRequestService : this.restApi;
  }

  load(tableId: string): Observable<TableConfigSchema> | never {
    console.log('Environment variables:', this.env);
    return this.requestService
      .request(this.env.apiUrl, 'GET', '/api/v5/app-table-designs', {
        'name.equals': tableId,
      })
      .pipe(
        map((res: any) => {
          try {
            const parsedData = JSON.parse(res.body[0]['tableDefinition']);
            return this.tableConfigSchema.parse(
              parsedData
            ) as TableConfigSchema;
          } catch (error) {
            throw new Error(`Data validation error: ${error}`);
          }
        })
      );
  }
}
