import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DurationService } from './duration.service';

describe('DurationService', () => {
  let service: DurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe]
    });
    service = TestBed.inject(DurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
