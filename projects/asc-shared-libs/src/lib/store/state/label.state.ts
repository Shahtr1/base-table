import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LabelConfig } from '../../model/label-config.model';
import { Inject, Injectable } from '@angular/core';
import { GetLabels } from '../actions/label.action';
import { LabelService } from '../../services/label/label.service';
import { FakeLabelService } from '../../services/label/fake-label.service';
import { tap } from 'rxjs';
import { labelConfigSchema } from '../../model/label-config.schema';

export class LabelStateModel {
  labels: LabelConfig = {};
}

@State<LabelStateModel>({
  name: 'labels',
  defaults: {
    labels: {},
  },
})
@Injectable()
export class LabelState {
  constructor(
    private realLabelService: LabelService,
    private fakeLabelService: FakeLabelService,
    @Inject('environment') private environment: any
  ) {}

  get labelService(): LabelService | FakeLabelService {
    return this.environment.isMockEnabled
      ? this.fakeLabelService
      : this.realLabelService;
  }

  @Selector()
  static getLabels(state: LabelStateModel) {
    return state.labels;
  }

  @Action(GetLabels)
  getLabels({ getState, setState }: StateContext<LabelStateModel>) {
    return this.labelService.getLabels().pipe(
      tap((labelConfig) => {
        try {
          labelConfigSchema.parse(labelConfig);
        } catch (error) {
          throw new Error(`Data validation error: ${error}`);
        }
        const state = getState();
        setState({
          ...state,
          labels: labelConfig,
        });
      })
    );
  }
}
