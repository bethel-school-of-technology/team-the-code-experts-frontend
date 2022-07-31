import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLogoutComponent } from './mobile-logout.component';

describe('MobileLogoutComponent', () => {
  let component: MobileLogoutComponent;
  let fixture: ComponentFixture<MobileLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileLogoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
