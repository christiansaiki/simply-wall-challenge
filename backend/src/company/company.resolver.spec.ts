import { Test, TestingModule } from '@nestjs/testing';
import { CompanyModel } from './company.model';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import {
  mockCompanyModel,
  mockCompanyScoreModel,
  mockPriceCloseModel,
} from '../../test/fixtures';
import { CompanyPriceCloseModel } from '../companyPriceClose/companyPriceClose.model';
import { CompanyScoreModel } from '../companyScore/companyScore.model';
import { CompanyPriceCloseService } from '../companyPriceClose/companyPriceClose.service';
import { CompanyScoreService } from '../companyScore/companyScore.service';

const companyServiceMock = {
  findAll: jest.fn((): CompanyModel[] => [mockCompanyModel]),
};

const companyPriceCloseServiceMock = {
  findByCompany: jest.fn((id: number): CompanyPriceCloseModel[] => [
    mockPriceCloseModel,
  ]),
  findLastByCompany: jest.fn(
    (id: number): CompanyPriceCloseModel => mockPriceCloseModel,
  ),
};

const companyScoreServiceMock = {
  findByCompany: jest.fn(
    (id: number): CompanyScoreModel => mockCompanyScoreModel,
  ),
};

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        { provide: CompanyService, useValue: companyServiceMock },
        {
          provide: CompanyPriceCloseService,
          useValue: companyPriceCloseServiceMock,
        },
        { provide: CompanyScoreService, useValue: companyScoreServiceMock },
      ],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all companies', async () => {
    const result = await resolver.companies();
    expect(Array.isArray(result)).toEqual(true);
    expect(companyServiceMock.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockCompanyModel]);
  });
  it('resolves the score', async () => {
    const result = await resolver.score({ id: 'id' });
    expect(companyScoreServiceMock.findByCompany).toHaveBeenCalledWith('id');
    expect(result).toEqual(mockCompanyScoreModel);
  });

  it('resolves last price close', async () => {
    const result = await resolver.lastPriceClose({ id: 'id' });
    expect(companyPriceCloseServiceMock.findLastByCompany).toHaveBeenCalledWith(
      'id',
    );
    expect(result).toEqual(mockPriceCloseModel);
  });
  it('resolves prices by company', async () => {
    const result = await resolver.prices({ id: 'id' });
    expect(companyPriceCloseServiceMock.findByCompany).toHaveBeenCalledWith(
      'id',
    );
    expect(result).toEqual([mockPriceCloseModel]);
  });
});
