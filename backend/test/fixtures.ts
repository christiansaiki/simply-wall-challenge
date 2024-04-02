import { CompanyModel } from '../src/company/company.model';
import { CompanyPriceCloseModel } from '../src/companyPriceClose/companyPriceClose.model';
import { CompanyScoreModel } from '../src/companyScore/companyScore.model';

export const mockCompanyScoreModel: CompanyScoreModel = {
  id: 26507,
  dividend: 0,
  future: 5,
  health: 4,
  management: 0,
  past: 0,
  value: 0,
  misc: 0,
  total: 9,
  sentence: 'High growth potential with adequate balance sheet.',
  dateGenerated: new Date('2020-05-24 11:06:28.000000'),
};

export const mockPriceCloseModel: CompanyPriceCloseModel = {
  date: new Date('2020-03-26'),
  price: 30.54,
  dateCreated: new Date('2020-04-26 02:00:34.3666667'),
};

export const mockCompanyModel: CompanyModel = {
  id: '46B285BC-B25F-4814-985C-390A4BFA2023',
  name: 'Afterpay',
  tickerSymbol: 'APT',
  exchangeSymbol: 'ASX',
  uniqueSymbol: 'ASX:APT',
  dateGenerated: new Date('2020-05-24 11:01:59.000000'),
  securityName: 'Ordinary Shares',
  exchangeCountryIso: 'AU',
  listingCurrencyIso: 'AUD',
  canonicalUrl: '/stocks/au/software/asx-apt/afterpay-shares',
  uniqueSymbolSlug: 'asx-apt',
  score: mockCompanyScoreModel,
  prices: [mockPriceCloseModel],
};
