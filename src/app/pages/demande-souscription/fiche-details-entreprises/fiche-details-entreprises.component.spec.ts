import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheDetailsEntreprisesComponent } from './fiche-details-entreprises.component';

describe('FicheDetailsEntreprisesComponent', () => {
  let component: FicheDetailsEntreprisesComponent;
  let fixture: ComponentFixture<FicheDetailsEntreprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheDetailsEntreprisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheDetailsEntreprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
