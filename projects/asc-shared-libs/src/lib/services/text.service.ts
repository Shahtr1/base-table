import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private store: Store) {}

  // convert(data: any, config = {}) {
  //   return this.store.pipe(select(fromLocale.getLocaleLabels)).pipe(
  //     map((labels) => {
  //       this.labels = labels;
  //       return this.applyLabel(
  //         data,
  //         Object.assign({}, DEFAULT_TRANSFORMATION_CONFIG, config)
  //       );
  //     })
  //   );
  // }
}
