import { TestBed } from '@angular/core/testing';

import { BroadcastCookieService } from './broadcast-cookies.service';

describe('BroadcastCookiesService', () => {
  let service: BroadcastCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
