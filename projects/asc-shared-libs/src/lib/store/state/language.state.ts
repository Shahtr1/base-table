import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LanguageService } from '../../services/language/language.service';
import { FakeLanguageService } from '../../services/language/fake-language.service';
import { LanguageConfig } from '../../model/language-config.model';
import { GetLanguages } from '../actions/language.action';

export class LanguageStateModel {
  languages: LanguageConfig[] = [];
}

@State<LanguageStateModel>({
  name: 'languages',
  defaults: {
    languages: [],
  },
})
@Injectable()
export class LanguageState {
  constructor(
    private realLanguageService: LanguageService,
    private fakeLanguageService: FakeLanguageService,
    @Inject('environment') private environment: any,
  ) {}

  get languageService(): LanguageService | FakeLanguageService {
    return this.environment.isMockEnabled
      ? this.fakeLanguageService
      : this.realLanguageService;
  }

  @Selector()
  static getLanguages(state: LanguageStateModel) {
    return state.languages;
  }

  @Action(GetLanguages)
  getLanguages({ getState, setState }: StateContext<LanguageStateModel>) {
    return this.languageService.getLanguages().pipe(
      tap((languageConfig) => {
        const state = getState();
        setState({
          ...state,
          languages: languageConfig,
        });
      }),
    );
  }
}
