import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { CompanyModel } from '../company/company.model';
import { CompanyScoreModel } from './companyScore.model';
import { CompanyScoreService } from './companyScore.service';

@Resolver((of) => CompanyModel)
export class CompanyScoreResolver {
  constructor(
    @Inject(CompanyScoreService)
    private companyScoreService: CompanyScoreService,
  ) {}

  @Query((scores) => [CompanyScoreModel])
  async scores(): Promise<CompanyScoreModel[]> {
    return this.companyScoreService.findAll();
  }

  @Query((returns) => CompanyScoreModel)
  async score(@Args('companyId', { type: () => String }) companyId: string) {
    return this.companyScoreService.findByCompany(companyId);
  }
}
