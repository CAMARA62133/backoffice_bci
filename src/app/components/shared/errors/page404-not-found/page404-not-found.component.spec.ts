import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404NotFoundComponent } from './page404-not-found.component';

describe('Page404NotFoundComponent', () => {
  let component: Page404NotFoundComponent;
  let fixture: ComponentFixture<Page404NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page404NotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page404NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
