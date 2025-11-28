import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentListeEntrepriseComponent } from './agent-liste-entreprise.component';

describe('AgentListeEntrepriseComponent', () => {
  let component: AgentListeEntrepriseComponent;
  let fixture: ComponentFixture<AgentListeEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentListeEntrepriseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentListeEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
