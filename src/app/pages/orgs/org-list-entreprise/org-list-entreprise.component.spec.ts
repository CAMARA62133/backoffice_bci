import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgListEntrepriseComponent } from './org-list-entreprise.component';

describe('OrgListEntrepriseComponent', () => {
  let component: OrgListEntrepriseComponent;
  let fixture: ComponentFixture<OrgListEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgListEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgListEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
