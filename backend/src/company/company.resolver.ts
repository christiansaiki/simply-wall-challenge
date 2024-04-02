import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { CompanyModel } from './company.model';
import { CompanyService } from './company.service';
import { CompanyScoreModel } from '../companyScore/companyScore.model';
import { CompanyScoreService } from '../companyScore/companyScore.service';
import { CompanyPriceCloseModel } from '../companyPriceClose/companyPriceClose.model';
import { CompanyPriceCloseService } from '../companyPriceClose/companyPriceClose.service';

@Resolver((of) => CompanyModel)
export class CompanyResolver {
  constructor(
    @Inject(CompanyService) private companyService: CompanyService,
    @Inject(CompanyScoreService)
    private companyScoreService: CompanyScoreService,
    @Inject(CompanyPriceCloseService)
    private companyPriceCloseService: CompanyPriceCloseService,
  ) {}

  @Query((companies) => [CompanyModel])
  async companies(): Promise<CompanyModel[]> {
    return await this.companyService.findAll();
  }

  @ResolveField((returns) => CompanyScoreModel)
  async score(@Parent() company): Promise<CompanyScoreModel> {
    const { id } = company;
    return this.companyScoreService.findByCompany(id);
  }

  @ResolveField((returns) => CompanyPriceCloseModel)
  async lastPriceClose(@Parent() company): Promise<CompanyPriceCloseModel> {
    const { id } = company;
    return this.companyPriceCloseService.findLastByCompany(id);
  }

  @ResolveField((returns) => [CompanyPriceCloseModel])
  async prices(@Parent() company): Promise<CompanyPriceCloseModel[]> {
    const { id } = company;
    return this.companyPriceCloseService.findByCompany(id);
  }
}
