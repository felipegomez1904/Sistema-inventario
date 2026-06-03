import { TestBed } from '@angular/core/testing';

import { AuteService } from './aute.service';

describe('AuteService', () => {
  let service: AuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
