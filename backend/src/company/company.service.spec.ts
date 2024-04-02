import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CompanyService } from './company.service';
import { CompanyModel } from './company.model';
import { mockCompanyModel } from '../../test/fixtures';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepository: Repository<CompanyModel>;
  let companyRepositoryToken: string | Function =
    getRepositoryToken(CompanyModel);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: companyRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<Repository<CompanyModel>>(
      companyRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all companies', async () => {
    (companyRepository.find as any) = jest.fn(() =>
      Promise.resolve([mockCompanyModel]),
    );

    const result = await service.findAll();
    expect(result).toEqual([mockCompanyModel]);
  });
});
