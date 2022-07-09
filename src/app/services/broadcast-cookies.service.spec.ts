import { TestBed } from '@angular/core/testing';

import { BroadcastCookiesService } from './broadcast-cookies.service';

describe('BroadcastCookiesService', () => {
  let service: BroadcastCookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastCookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
