import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyModel } from './company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyModel)
    private companyRepository: Repository<CompanyModel>,
  ) {}

  findAll(): Promise<CompanyModel[]> {
    return this.companyRepository.find();
  }
}
