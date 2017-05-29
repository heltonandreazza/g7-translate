import { TestBed, inject } from '@angular/core/testing';

import { TranslateG7Service } from './translate-g7.service';

describe('TranslateG7Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateG7Service]
    });
  });

  it('should be created', inject([TranslateG7Service], (service: TranslateG7Service) => {
    expect(service).toBeTruthy();
  }));
});
