import { TestBed } from '@angular/core/testing';

import { EmployeeAuthenticationService } from './employee-authentication.service';

describe('EmployeeAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeAuthenticationService = TestBed.get(EmployeeAuthenticationService);
    expect(service).toBeTruthy();
  });
});
