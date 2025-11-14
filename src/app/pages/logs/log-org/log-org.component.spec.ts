import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOrgComponent } from './log-org.component';

describe('LogOrgComponent', () => {
  let component: LogOrgComponent;
  let fixture: ComponentFixture<LogOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOrgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
