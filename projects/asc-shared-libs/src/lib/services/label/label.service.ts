import { Injectable } from '@angular/core';
import { ILabelService } from './ilabel.service';
import { map, Observable, of } from 'rxjs';
import { LabelConfig } from '../../model/label-config.model';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class LabelService implements ILabelService {
  constructor(private restService: RequestService) {}

  getLabels(): Observable<LabelConfig> {
    return this.restService.request('GET', '/api/app-labels').pipe(
      map(({ body }) => {
        // TODO: get properties from store
        console.log('body', body);
        return body;
      })
    );
  }
}
