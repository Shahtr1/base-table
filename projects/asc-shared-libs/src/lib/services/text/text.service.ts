import { Injectable } from '@angular/core';
import { ItextService } from './itext.service';
import { Observable, of } from 'rxjs';
import { GeneralText } from '../../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class TextService implements ItextService {
  convert(data: GeneralText[]): Observable<GeneralText[]> {
    // return this.store.pipe(select(fromLocale.getLocaleLabels)).pipe(
    //   map((labels) => {
    //     this.labels = labels;
    //     return this.applyLabel(
    //       data,
    //       Object.assign({}, DEFAULT_TRANSFORMATION_CONFIG, config)
    //     );
    //   })
    // );
    return of([
      { label: 'Code', labelId: 'CODE' },
      { label: 'Category', labelId: 'CATEGORY' },
    ]);
  }
}
