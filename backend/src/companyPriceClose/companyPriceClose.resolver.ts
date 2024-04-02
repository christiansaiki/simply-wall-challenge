import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { CompanyPriceCloseService } from './companyPriceClose.service';
import { CompanyPriceCloseModel } from './companyPriceClose.model';

@Resolver((of) => CompanyPriceCloseModel)
export class CompanyPriceCloseResolver {
  constructor(
    @Inject(CompanyPriceCloseService)
    private companyPriceCloseService: CompanyPriceCloseService,
  ) {}

  @Query((prices) => [CompanyPriceCloseModel])
  async pricesByCompany(
    @Args('companyId', { type: () => String }) companyId: string,
  ): Promise<CompanyPriceCloseModel[]> {
    return this.companyPriceCloseService.findByCompany(companyId);
  }
}
