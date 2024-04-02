import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPriceCloseService } from './companyPriceClose.service';
import { Repository } from 'typeorm';
import { CompanyPriceCloseModel } from './companyPriceClose.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockPriceCloseModel } from '../../test/fixtures';

describe('CompanyPriceCloseService', () => {
  let service: CompanyPriceCloseService;
  let companyScoreRepository: Repository<CompanyPriceCloseModel>;
  let companyScoreRepositoryToken: string | Function = getRepositoryToken(
    CompanyPriceCloseModel,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyPriceCloseService,
        {
          provide: companyScoreRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompanyPriceCloseService>(CompanyPriceCloseService);
    companyScoreRepository = module.get<Repository<CompanyPriceCloseModel>>(
      companyScoreRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the prices by companyId', async () => {
    const getMany = jest.fn(() => Promise.resolve([mockPriceCloseModel]));
    const where = jest.fn(() => ({ getMany }));
    (companyScoreRepository.createQueryBuilder as any) = jest.fn(() => ({
      where,
    }));

    const result = await service.findByCompany('1');
    expect(companyScoreRepository.createQueryBuilder).toHaveBeenCalledWith(
      'swsCompanyPriceClose',
    );
    expect(where).toHaveBeenCalledWith(
      'swsCompanyPriceClose.company_id = :id',
      {
        id: '1',
      },
    );
    expect(getMany).toHaveBeenCalled();
    expect(result).toEqual([mockPriceCloseModel]);
  });

  it('should get the last price by companyId', async () => {
    const getOne = jest.fn(() => Promise.resolve(mockPriceCloseModel));
    const orderBy = jest.fn(() => ({ getOne }));
    const where = jest.fn(() => ({ orderBy }));
    (companyScoreRepository.createQueryBuilder as any) = jest.fn(() => ({
      where,
    }));

    const result = await service.findLastByCompany('1');
    expect(companyScoreRepository.createQueryBuilder).toHaveBeenCalledWith(
      'swsCompanyPriceClose',
    );
    expect(where).toHaveBeenCalledWith(
      'swsCompanyPriceClose.company_id = :id',
      {
        id: '1',
      },
    );
    expect(orderBy).toHaveBeenCalledWith({ date_created: 'DESC' });
    expect(getOne).toHaveBeenCalled();
    expect(result).toEqual(mockPriceCloseModel);
  });
});
