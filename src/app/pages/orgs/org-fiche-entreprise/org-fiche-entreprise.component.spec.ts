import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgFicheEntrepriseComponent } from './org-fiche-entreprise.component';

describe('OrgFicheEntrepriseComponent', () => {
  let component: OrgFicheEntrepriseComponent;
  let fixture: ComponentFixture<OrgFicheEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgFicheEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgFicheEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
