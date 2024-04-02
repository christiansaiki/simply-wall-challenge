import { Test, TestingModule } from '@nestjs/testing';
import { CompanyScoreService } from './companyScore.service';
import { Repository } from 'typeorm';
import { CompanyScoreModel } from './companyScore.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCompanyScoreModel } from '../../test/fixtures';

describe('CompanyScoreService', () => {
  let service: CompanyScoreService;
  let companyScoreRepository: Repository<CompanyScoreModel>;
  let companyScoreRepositoryToken: string | Function =
    getRepositoryToken(CompanyScoreModel);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyScoreService,
        {
          provide: companyScoreRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CompanyScoreService>(CompanyScoreService);
    companyScoreRepository = module.get<Repository<CompanyScoreModel>>(
      companyScoreRepositoryToken,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the score by companyId', async () => {
    const getOne = jest.fn(() => Promise.resolve(mockCompanyScoreModel));
    const where = jest.fn(() => ({ getOne }));
    (companyScoreRepository.createQueryBuilder as any) = jest.fn(() => ({
      where,
    }));

    const result = await service.findByCompany('1');
    expect(companyScoreRepository.createQueryBuilder).toHaveBeenCalledWith(
      'swsCompanyScore',
    );
    expect(where).toHaveBeenCalledWith('swsCompanyScore.company_id = :id', {
      id: '1',
    });
    expect(getOne).toHaveBeenCalled();
    expect(result).toEqual(mockCompanyScoreModel);
  });

  it('should get all scores', async () => {
    (companyScoreRepository.find as any) = jest.fn(() =>
      Promise.resolve([mockCompanyScoreModel]),
    );

    const result = await service.findAll();
    expect(result).toEqual([mockCompanyScoreModel]);
  });
});
