import { TestBed } from '@angular/core/testing';

import { FormNouveauPasswordService } from './form-nouveau-password.service';

describe('FormNouveauPasswordService', () => {
  let service: FormNouveauPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormNouveauPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
