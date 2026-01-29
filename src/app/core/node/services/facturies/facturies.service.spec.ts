import { TestBed } from '@angular/core/testing';

import { FacturiesService } from './facturies.service';

describe('FacturiesService', () => {
  let service: FacturiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
