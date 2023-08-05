import { Injectable } from '@angular/core';
import { ILabelService } from './ilabel.service';
import { Observable, of } from 'rxjs';
import { LabelConfig } from '../../model/label-config.model';

@Injectable({
  providedIn: 'root',
})
export class LabelService implements ILabelService {
  getLabels(): Observable<LabelConfig> {
    return of({});
  }
}
