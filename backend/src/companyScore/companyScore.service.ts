import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyScoreModel } from './companyScore.model';

@Injectable()
export class CompanyScoreService {
  constructor(
    @InjectRepository(CompanyScoreModel)
    private companyScoreRepository: Repository<CompanyScoreModel>,
  ) {}

  findByCompany(id: string): Promise<CompanyScoreModel> {
    return this.companyScoreRepository
      .createQueryBuilder('swsCompanyScore')
      .where('swsCompanyScore.company_id = :id', { id })
      .getOne();
  }

  findAll(): Promise<CompanyScoreModel[]> {
    return this.companyScoreRepository.find();
  }
}
