import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyPriceCloseModel } from './companyPriceClose.model';

@Injectable()
export class CompanyPriceCloseService {
  constructor(
    @InjectRepository(CompanyPriceCloseModel)
    private companyPriceCloseRepository: Repository<CompanyPriceCloseModel>,
  ) {}

  findByCompany(id: string): Promise<CompanyPriceCloseModel[]> {
    return this.companyPriceCloseRepository
      .createQueryBuilder('swsCompanyPriceClose')
      .where('swsCompanyPriceClose.company_id = :id', { id })
      .getMany();
  }

  findLastByCompany(id: string): Promise<CompanyPriceCloseModel> {
    return this.companyPriceCloseRepository
      .createQueryBuilder('swsCompanyPriceClose')
      .where('swsCompanyPriceClose.company_id = :id', { id })
      .orderBy({ date_created: 'DESC' })
      .getOne();
  }
}
