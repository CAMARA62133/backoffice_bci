import { TestBed } from '@angular/core/testing';

import { PaginationsService } from './paginations.service';

describe('PaginationsService', () => {
  let service: PaginationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
