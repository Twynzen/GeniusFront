import { TestBed } from '@angular/core/testing';

import { GptQuestToImproveService } from './gpt-quest-to-improve.service';

describe('GptQuestToImproveService', () => {
  let service: GptQuestToImproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GptQuestToImproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
