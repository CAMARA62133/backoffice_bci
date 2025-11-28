import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgListUtilisateurComponent } from './org-list-utilisateur.component';

describe('OrgListUtilisateurComponent', () => {
  let component: OrgListUtilisateurComponent;
  let fixture: ComponentFixture<OrgListUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgListUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgListUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
