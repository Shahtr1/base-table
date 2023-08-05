import { Observable } from 'rxjs';
import { GeneralText } from '../../model/lib.model';

export interface ItextService {
  convert(data: GeneralText[]): Observable<GeneralText[]>;
}
