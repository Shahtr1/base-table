import { Observable } from 'rxjs';
import { LanguageConfig } from '../../model/language-config.model';

export interface ILanguageService {
  getLanguages(): Observable<LanguageConfig[]>;
}
