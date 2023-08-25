import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { GeneralText } from '../model/lib.model';
import { Store } from '@ngxs/store';
import { LabelConfig } from '../model/label-config.model';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor(private store: Store) {}

  // TODO: Why isn't this working?
  // Switched to this.store.select() in convert() below, till we get the answer (Best of Luck!)
  // @Select(LabelState.getLabels) labels$!: Observable<LabelConfig>;
  // Some info here! As its getting deprecated soon, so we are on the right track
  // https://stackoverflow.com/a/76938577/13964289

  convert(data: GeneralText): Observable<GeneralText> {
    const labels$ = this.getLabelsFromState();

    return labels$.pipe(
      map((labels) => {
        return this.applyLabel(data, labels);
      })
    );
  }

  private getLabelsFromState() {
    return this.store.select(
      (state) => state.labels.labels
    ) as Observable<LabelConfig>;
  }

  private applyLabel(data: GeneralText, labels: LabelConfig) {
    const updatedData: GeneralText = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const labelId = data[key].labelId;
        const labelValue = labels[labelId] || labelId;

        updatedData[key] = {
          ...data[key],
          label: labelValue,
        };
      }
    }

    return updatedData;
  }
}
