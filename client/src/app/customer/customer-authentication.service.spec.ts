import { TestBed } from '@angular/core/testing';

import { CustomerAuthenticationService } from './customer-authentication.service';

describe('CustomerAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAuthenticationService = TestBed.get(CustomerAuthenticationService);
    expect(service).toBeTruthy();
  });
});
