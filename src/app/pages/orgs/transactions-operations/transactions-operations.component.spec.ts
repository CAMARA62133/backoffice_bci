import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsOperationsComponent } from './transactions-operations.component';

describe('TransactionsOperationsComponent', () => {
  let component: TransactionsOperationsComponent;
  let fixture: ComponentFixture<TransactionsOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
