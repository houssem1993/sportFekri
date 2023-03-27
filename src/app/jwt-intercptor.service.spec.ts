import { TestBed } from '@angular/core/testing';

import { JwtIntercptorService } from './jwt-intercptor.service';

describe('JwtIntercptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtIntercptorService = TestBed.get(JwtIntercptorService);
    expect(service).toBeTruthy();
  });
});
