import { Inject, Injectable } from '@angular/core';
import { RequestService } from './request/request.service';
import { map } from 'rxjs';
import { FakeRequestService } from './request/fake-request.service';

@Injectable({
  providedIn: 'root',
})
export class TableConfigService {
  constructor(
    private restApi: RequestService,
    private fakeRequestService: FakeRequestService,
    @Inject('environment')
    private env: any
  ) {}

  get requestService() {
    return this.env.isMockEnabled ? this.fakeRequestService : this.restApi;
  }

  load(tableId: string) {
    console.log('Environment variables', this.env);
    return this.requestService
      .request(this.env.apiUrl, 'GET', '/api/v5/app-table-designs', {
        'name.equals': tableId,
      })
      .pipe(
        map((res: any) => {
          if (!res.body) return;

          return JSON.parse(res.body[0]['tableDefinition']);
        })
      );
  }
}
