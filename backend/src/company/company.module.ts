import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { CompanyModel } from './company.model';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { CompanyScoreModule } from '../companyScore/companyScore.module';
import { CompanyPriceCloseModule } from '..//companyPriceClose/companyPriceClose.module';

@Module({
  // @ts-ignore
  imports: [
    forwardRef(() => CompanyScoreModule),
    forwardRef(() => CompanyPriceCloseModule),
    TypeOrmModule.forFeature([CompanyModel]),
  ],
  providers: [CompanyService, CompanyResolver],
  exports: [CompanyService],
})
export class CompanyModule {}
