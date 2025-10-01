import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNouveauPasswordComponent } from './form-nouveau-password.component';

describe('FormNouveauPasswordComponent', () => {
  let component: FormNouveauPasswordComponent;
  let fixture: ComponentFixture<FormNouveauPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNouveauPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNouveauPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
