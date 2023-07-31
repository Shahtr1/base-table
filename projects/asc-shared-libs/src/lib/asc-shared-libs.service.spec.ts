import { TestBed } from '@angular/core/testing';

import { AscSharedLibsService } from './asc-shared-libs.service';

describe('AscSharedLibsService', () => {
  let service: AscSharedLibsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AscSharedLibsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
