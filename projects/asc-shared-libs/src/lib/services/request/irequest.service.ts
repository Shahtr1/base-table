import { Observable } from 'rxjs';

export interface IRequestService {
  request(
    apiEndpoint: string,
    method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH',
    route: string,
    data?: any,
    options?: any
  ): Observable<any>;
}
