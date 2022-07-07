import { TestBed } from '@angular/core/testing';

import { NoPostsService } from './no-posts.service';

describe('NoPostsService', () => {
  let service: NoPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
