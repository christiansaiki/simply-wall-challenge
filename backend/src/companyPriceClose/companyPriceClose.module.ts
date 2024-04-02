import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { CompanyPriceCloseModel } from './companyPriceClose.model';
import { CompanyPriceCloseResolver } from './companyPriceClose.resolver';
import { CompanyPriceCloseService } from './companyPriceClose.service';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [CompanyPriceCloseModel],
      // @ts-ignore
      forwardRef(() => CompanyModule),
    ),
  ],
  providers: [CompanyPriceCloseService, CompanyPriceCloseResolver],
  exports: [CompanyPriceCloseService],
})
export class CompanyPriceCloseModule {}
