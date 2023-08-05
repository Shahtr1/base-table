import { Injectable } from '@angular/core';
import { ItextService } from './itext.service';
import { Observable, of } from 'rxjs';
import { GeneralText } from '../../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class FakeTextService implements ItextService {
  constructor() {}

  convert(data: GeneralText[]): Observable<GeneralText[]> {
    return of([
      { label: 'Code', labelId: 'CODE' },
      { label: 'Category', labelId: 'CATEGORY' },
    ]);
  }
}
