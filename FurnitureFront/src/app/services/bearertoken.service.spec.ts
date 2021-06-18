import { TestBed } from '@angular/core/testing';

import { BearertokenService } from './bearertoken.service';

describe('BearertokenService', () => {
  let service: BearertokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BearertokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
