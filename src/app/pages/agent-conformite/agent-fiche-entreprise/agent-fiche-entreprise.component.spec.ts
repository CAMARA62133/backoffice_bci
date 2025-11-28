import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFicheEntrepriseComponent } from './agent-fiche-entreprise.component';

describe('AgentFicheEntrepriseComponent', () => {
  let component: AgentFicheEntrepriseComponent;
  let fixture: ComponentFixture<AgentFicheEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentFicheEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentFicheEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
