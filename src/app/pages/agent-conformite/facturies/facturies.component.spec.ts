import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturiesComponent } from './facturies.component';

describe('FacturiesComponent', () => {
  let component: FacturiesComponent;
  let fixture: ComponentFixture<FacturiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
