import { Observable } from 'rxjs';
import { HttpVerbs } from '../../model/lib.model';

export interface IRequestService {
  request(
    method: HttpVerbs,
    apiEndpoint: string,
    route: string,
    data?: any,
    options?: any
  ): Observable<any>;
}
