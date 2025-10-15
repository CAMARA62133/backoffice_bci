import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateOtpAfterVerifiedEmailComponent } from './validate-otp-after-verified-email.component';

describe('ValidateOtpAfterVerifiedEmailComponent', () => {
  let component: ValidateOtpAfterVerifiedEmailComponent;
  let fixture: ComponentFixture<ValidateOtpAfterVerifiedEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateOtpAfterVerifiedEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateOtpAfterVerifiedEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
