import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingVerifyEmailPageComponent } from './loading-verify-email-page.component';

describe('LoadingVerifyEmailPageComponent', () => {
  let component: LoadingVerifyEmailPageComponent;
  let fixture: ComponentFixture<LoadingVerifyEmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingVerifyEmailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingVerifyEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
