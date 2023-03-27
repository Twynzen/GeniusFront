import { TestBed } from '@angular/core/testing';

import { EmotionDetectorService } from './emotion-detector.service';

describe('EmotionDetectorService', () => {
  let service: EmotionDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmotionDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
