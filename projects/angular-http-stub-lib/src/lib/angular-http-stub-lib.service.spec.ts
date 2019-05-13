import { TestBed } from '@angular/core/testing';

import { AngularHttpStubLibService } from './angular-http-stub-lib.service';

describe('AngularHttpStubLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularHttpStubLibService = TestBed.get(AngularHttpStubLibService);
    expect(service).toBeTruthy();
  });
});
