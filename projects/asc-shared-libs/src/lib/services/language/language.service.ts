import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RequestService } from '../request/request.service';
import { ILanguageService } from './ilanguage.service';
import { LanguageConfig } from '../../model/language-config.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService implements ILanguageService {
  constructor(private restService: RequestService) {}

  getLanguages(): Observable<LanguageConfig[]> {
    return this.restService.request('GET', '/api/app-languages').pipe(
      map(({ body }) => {
        // TODO: get properties from store
        console.log('body', body);
        return body;
      }),
    );
  }
}
