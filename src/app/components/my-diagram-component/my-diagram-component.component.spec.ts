import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiagramComponentComponent } from './my-diagram-component.component';

describe('MyDiagramComponentComponent', () => {
  let component: MyDiagramComponentComponent;
  let fixture: ComponentFixture<MyDiagramComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDiagramComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDiagramComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
