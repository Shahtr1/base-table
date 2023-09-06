import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PageSizeInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    /** Check if 'size' parameter is already present in the URL and request is GET */
    if (!request.params.has('size') && request.method === 'GET') {
      /** Add 'size' parameter with a large value (e.g., 2147483647) to retrieve all items */
      const updatedParams = request.params.set('size', '2147483647');

      /** Clone the request and append the updated params */
      const updatedRequest = request.clone({
        params: updatedParams,
      });

      return next.handle(updatedRequest);
    }

    /** If 'size' parameter is already present and request is not GET, continue with the original request */
    return next.handle(request);
  }
}
