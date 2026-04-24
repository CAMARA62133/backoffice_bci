import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTradeDashboardComponent } from './agent-trade-dashboard.component';

describe('AgentTradeDashboardComponent', () => {
  let component: AgentTradeDashboardComponent;
  let fixture: ComponentFixture<AgentTradeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentTradeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentTradeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
