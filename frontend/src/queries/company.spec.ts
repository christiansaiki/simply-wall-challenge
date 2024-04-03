import { COMPANIES_QUERY } from "./company";

jest.mock('graphql-tag', () => {
    return jest.fn((strings) => {
        // Mock implementation for gql function
        const query = strings.join('');
        return { query };
    })
});

describe("companies query", () => {
it('should mock gql function', () => {
expect(COMPANIES_QUERY).toEqual({query: `
  query GetCompanies {
    companies {
      id
      name
      uniqueSymbol
      exchangeSymbol
      lastPriceClose {
        price
      }
      score {
        total
      }
    }
  }
`});
});
});


