import { TestBed } from '@angular/core/testing';

import { OtpLoginService } from './otp-login.service';

describe('OtpLoginService', () => {
  let service: OtpLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
