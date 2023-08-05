import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeneralText } from '../model/lib.model';

@Injectable({
  providedIn: 'root',
})
export class TextService {
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
