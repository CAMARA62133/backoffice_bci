import { TestBed } from '@angular/core/testing';

import { StatusBancaireService } from './status-bancaire.service';

describe('StatusBancaireService', () => {
  let service: StatusBancaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusBancaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
