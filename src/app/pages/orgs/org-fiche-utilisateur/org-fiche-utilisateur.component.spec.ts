import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgFicheUtilisateurComponent } from './org-fiche-utilisateur.component';

describe('OrgFicheUtilisateurComponent', () => {
  let component: OrgFicheUtilisateurComponent;
  let fixture: ComponentFixture<OrgFicheUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgFicheUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgFicheUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
