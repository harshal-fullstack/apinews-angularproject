import { TestBed } from '@angular/core/testing';

import { Newsservice } from './newsservice';

describe('Newsservice', () => {
  let service: Newsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Newsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
