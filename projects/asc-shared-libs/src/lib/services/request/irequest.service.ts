import { Observable } from 'rxjs';
import { HttpVerbs } from '../../model/lib.model';

export interface IRequestService {
  request(
    apiEndpoint: string,
    method: HttpVerbs,
    route: string,
    data?: any,
    options?: any
  ): Observable<any>;
}
