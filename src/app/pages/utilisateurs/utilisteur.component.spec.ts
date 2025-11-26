import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisteurComponent } from './utilisteur.component';

describe('UtilisteurComponent', () => {
  let component: UtilisteurComponent;
  let fixture: ComponentFixture<UtilisteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
