import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesSupervisionsComponent } from './alertes-supervisions.component';

describe('AlertesSupervisionsComponent', () => {
  let component: AlertesSupervisionsComponent;
  let fixture: ComponentFixture<AlertesSupervisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertesSupervisionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertesSupervisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
