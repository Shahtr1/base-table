import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { PropertyConfig } from '../../model/property-config.model';
import { GetProperties } from '../actions/property.action';
import { PropertyService } from '../../services/property/property.service';
import { FakePropertyService } from '../../services/property/fake-property.service';

export class PropertyStateModel {
  properties: PropertyConfig[] = [];
}

@State<PropertyStateModel>({
  name: 'properties',
  defaults: {
    properties: [],
  },
})
@Injectable()
export class PropertyState {
  constructor(
    private realPropertyService: PropertyService,
    private fakePropertyService: FakePropertyService,
    @Inject('environment') private environment: any,
  ) {}

  get propertyService(): PropertyService | FakePropertyService {
    return this.environment.isMockEnabled
      ? this.fakePropertyService
      : this.realPropertyService;
  }

  @Selector()
  static getProperties(state: PropertyStateModel) {
    return state.properties;
  }

  @Action(GetProperties)
  getProperties({ getState, setState }: StateContext<PropertyStateModel>) {
    return this.propertyService.getProperties().pipe(
      tap((propertyConfig) => {
        const state = getState();
        setState({
          ...state,
          properties: propertyConfig,
        });
      }),
    );
  }
}
