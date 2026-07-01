import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Newsservice } from './newsservice';

describe('Newsservice', () => {
  let service: Newsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(Newsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
