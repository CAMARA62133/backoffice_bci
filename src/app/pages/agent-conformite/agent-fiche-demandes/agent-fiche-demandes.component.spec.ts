import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFicheDemandesComponent } from './agent-fiche-demandes.component';

describe('AgentFicheDemandesComponent', () => {
  let component: AgentFicheDemandesComponent;
  let fixture: ComponentFixture<AgentFicheDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentFicheDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentFicheDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
