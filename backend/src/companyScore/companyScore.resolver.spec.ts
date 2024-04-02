import { Test, TestingModule } from '@nestjs/testing';
import { CompanyScoreModel } from './companyScore.model';
import { CompanyScoreResolver } from './companyScore.resolver';
import { CompanyScoreService } from './companyScore.service';
import { mockCompanyScoreModel } from '../../test/fixtures';

const companyScoreServiceMock = {
  findByCompany: jest.fn(
    (id: number): CompanyScoreModel => mockCompanyScoreModel,
  ),
  findAll: jest.fn((): CompanyScoreModel[] => [mockCompanyScoreModel]),
};

describe('CompanyScoreResolver', () => {
  let resolver: CompanyScoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyScoreResolver,
        { provide: CompanyScoreService, useValue: companyScoreServiceMock },
      ],
    }).compile();

    resolver = module.get<CompanyScoreResolver>(CompanyScoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all scores', async () => {
    const result = await resolver.scores();
    expect(Array.isArray(result)).toEqual(true);
    expect(companyScoreServiceMock.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockCompanyScoreModel]);
  });

  it('should query a single score', async () => {
    const result = await resolver.score('id');
    expect(companyScoreServiceMock.findByCompany).toHaveBeenCalledWith('id');
    expect(result).toEqual(mockCompanyScoreModel);
  });
});
