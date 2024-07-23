import { TestBed } from '@angular/core/testing';

import { MeesageSendService } from './meesage-send.service';

describe('MeesageSendService', () => {
  let service: MeesageSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeesageSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
