import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentListeDemandesComponent } from './agent-liste-demandes.component';

describe('AgentListeDemandesComponent', () => {
  let component: AgentListeDemandesComponent;
  let fixture: ComponentFixture<AgentListeDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentListeDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentListeDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
