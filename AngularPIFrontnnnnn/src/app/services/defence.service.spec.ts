import { TestBed } from '@angular/core/testing';

import { DefenseService } from './defence.service';

describe('DefenceService', () => {
  let service: DefenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
