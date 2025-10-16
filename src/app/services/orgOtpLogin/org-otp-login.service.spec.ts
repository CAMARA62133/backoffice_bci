import { TestBed } from '@angular/core/testing';

import { OrgOtpLoginService } from './org-otp-login.service';

describe('OrgOtpLoginService', () => {
  let service: OrgOtpLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgOtpLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
