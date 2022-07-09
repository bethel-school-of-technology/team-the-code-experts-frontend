import { TestBed } from '@angular/core/testing';

import { FlaggingService } from './flagging.service';

describe('FlaggingService', () => {
  let service: FlaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
