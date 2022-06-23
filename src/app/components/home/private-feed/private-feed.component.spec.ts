import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFeedComponent } from './private-feed.component';

describe('PrivateFeedComponent', () => {
  let component: PrivateFeedComponent;
  let fixture: ComponentFixture<PrivateFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
