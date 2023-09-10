import { Injectable } from '@angular/core';
import { ILanguageService } from './ilanguage.service';
import { Observable, of } from 'rxjs';
import { LanguageConfig } from '../../model/language-config.model';

@Injectable({
  providedIn: 'root',
})
export class FakeLanguageService implements ILanguageService {
  getLanguages(): Observable<LanguageConfig[]> {
    return of([
      {
        direction: 'LTR',
        name: 'English',
        uuid: 'english',
      },
      {
        direction: 'RTL',
        name: 'Arabic',
        uuid: 'arabic',
      },
    ]);
  }
}
