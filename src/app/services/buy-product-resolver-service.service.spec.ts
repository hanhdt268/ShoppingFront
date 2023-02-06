import { TestBed } from '@angular/core/testing';

import { BuyProductResolverServiceService } from './buy-product-resolver-service.service';

describe('BuyProductResolverServiceService', () => {
  let service: BuyProductResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
