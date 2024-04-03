import gql from 'graphql-tag';

export const COMPANIES_QUERY = gql`
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
`;
