import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitialiserPasswordComponent } from './reinitialiser-password.component';

describe('ReinitialiserPasswordComponent', () => {
  let component: ReinitialiserPasswordComponent;
  let fixture: ComponentFixture<ReinitialiserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReinitialiserPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinitialiserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
