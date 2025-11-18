import { TestBed } from '@angular/core/testing';

import { OrgLogService } from './org-log.service';

describe('OrgLogService', () => {
  let service: OrgLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
