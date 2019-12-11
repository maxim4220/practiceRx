import { TestBed } from '@angular/core/testing';

import { ValidationMsgService } from './validation.service';

describe('ValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationMsgService = TestBed.get(ValidationMsgService);
    expect(service).toBeTruthy();
  });
});
