# simply-wall-challenge
## Requirements
- NodeJS v20

## Deployed application:

## Tech stack
- NestJS + GraphQL + sqlite

## Backend setup
```bash
# from the project root
cd backend
npm i
npm start
```
The application with be running at http://localhost:3000/graphql

## Query examples
```graphql
# prices by company (AfterPay)
{
	pricesByCompany(companyId: "46B285BC-B25F-4814-985C-390A4BFA2023") {
    price
  }
}

# all companies with last known share price and total snowflake score
{
	companies {
    name
    uniqueSymbol
    lastPriceClose {
      price
    }
    score {
      total
    }
  }
}

# if instead you want all prices
{
	companies {
    name
    uniqueSymbol
    prices {
      price
    }
    score {
      total
    }
  }
}
```
