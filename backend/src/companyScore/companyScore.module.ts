import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { CompanyScoreModel } from './companyScore.model';
import { CompanyScoreService } from './companyScore.service';
import { CompanyScoreResolver } from './companyScore.resolver';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [CompanyScoreModel],
      // @ts-ignore
      forwardRef(() => CompanyModule),
    ),
  ],
  providers: [CompanyScoreService, CompanyScoreResolver],
  exports: [CompanyScoreService],
})
export class CompanyScoreModule {}
