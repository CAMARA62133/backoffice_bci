import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeClientComponent } from './detail-demande-client.component';

describe('DetailDemandeClientComponent', () => {
  let component: DetailDemandeClientComponent;
  let fixture: ComponentFixture<DetailDemandeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDemandeClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
