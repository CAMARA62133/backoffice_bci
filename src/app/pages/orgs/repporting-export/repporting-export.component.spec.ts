import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportingExportComponent } from './repporting-export.component';

describe('RepportingExportComponent', () => {
  let component: RepportingExportComponent;
  let fixture: ComponentFixture<RepportingExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepportingExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepportingExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
