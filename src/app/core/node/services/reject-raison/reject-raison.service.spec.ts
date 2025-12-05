import { TestBed } from '@angular/core/testing';

import { RejectRaisonService } from './reject-raison.service';

describe('RejectRaisonService', () => {
  let service: RejectRaisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectRaisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
