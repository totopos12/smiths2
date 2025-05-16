import { TestBed } from '@angular/core/testing';

import { SmithsdataService } from './smithsdata.service';

describe('SmithsdataService', () => {
  let service: SmithsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmithsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
