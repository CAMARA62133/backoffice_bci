import { TestBed } from '@angular/core/testing';

import { ConfigNotificationService } from './config-notification.service';

describe('ConfigNotificationService', () => {
  let service: ConfigNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
