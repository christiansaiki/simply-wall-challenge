import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPriceCloseModel } from './companyPriceClose.model';
import { CompanyPriceCloseResolver } from './companyPriceClose.resolver';
import { CompanyPriceCloseService } from './companyPriceClose.service';
import { mockPriceCloseModel } from '../../test/fixtures';

const companyPriceCloseServiceMock = {
  findByCompany: jest.fn((id: number): CompanyPriceCloseModel[] => [
    mockPriceCloseModel,
  ]),
};

describe('CompanyPriceCloseResolver', () => {
  let resolver: CompanyPriceCloseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyPriceCloseResolver,
        {
          provide: CompanyPriceCloseService,
          useValue: companyPriceCloseServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<CompanyPriceCloseResolver>(CompanyPriceCloseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should query all prices by company', async () => {
    const result = await resolver.pricesByCompany('1');
    expect(Array.isArray(result)).toEqual(true);
    expect(companyPriceCloseServiceMock.findByCompany).toHaveBeenCalledWith(
      '1',
    );
    expect(result).toEqual([mockPriceCloseModel]);
  });
});
