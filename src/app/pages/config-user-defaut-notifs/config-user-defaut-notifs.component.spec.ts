import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUserDefautNotifsComponent } from './config-user-defaut-notifs.component';

describe('ConfigUserDefautNotifsComponent', () => {
  let component: ConfigUserDefautNotifsComponent;
  let fixture: ComponentFixture<ConfigUserDefautNotifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigUserDefautNotifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigUserDefautNotifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
