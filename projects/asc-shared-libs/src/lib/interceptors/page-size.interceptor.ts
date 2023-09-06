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
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request method is GET
    if (request.method === 'GET') {
      // Check if there are path variables in the URL
      if (!this.hasPathVariables(request.url)) {
        // Add 'size' parameter with a large value (e.g., 2147483647) to retrieve all items
        const updatedParams = request.params.set('size', '2147483647');

        // Clone the request and append the updated params
        const updatedRequest = request.clone({
          params: updatedParams,
        });

        return next.handle(updatedRequest);
      }
    }

    // If not a GET request or if there are path variables, continue with the original request
    return next.handle(request);
  }

  private hasPathVariables(url: string): boolean {
    // Check if the URL contains curly braces indicating path variables
    return /\{.*?\}/.test(url);
  }
}
