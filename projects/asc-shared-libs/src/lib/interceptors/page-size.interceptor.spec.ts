import { TestBed } from '@angular/core/testing';

import { PageSizeInterceptorInterceptor } from './page-size.interceptor';

describe('PageSizeInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PageSizeInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PageSizeInterceptorInterceptor = TestBed.inject(PageSizeInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
