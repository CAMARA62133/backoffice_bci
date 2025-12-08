import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nodeSessionGuard } from './node-session.guard';

describe('nodeSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nodeSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
