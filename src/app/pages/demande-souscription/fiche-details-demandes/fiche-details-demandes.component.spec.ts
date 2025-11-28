import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDetailsDemandesComponent } from './fiche-details-demandes.component';

describe('FicheDetailsDemandesComponent', () => {
  let component: FicheDetailsDemandesComponent;
  let fixture: ComponentFixture<FicheDetailsDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheDetailsDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheDetailsDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
