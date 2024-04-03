# simply-wall-challenge
## Requirements
- NodeJS v20

## Deployed application:
- Backend (graphql playground): https://simply-wall-challenge.onrender.com/graphql
  ![image](https://github.com/christiansaiki/simply-wall-challenge/assets/7768082/47f8c072-3d59-4c57-8cdf-267610ad04be)

- Frontend: https://simply-wall-challenge.vercel.app/
  ![image](https://github.com/christiansaiki/simply-wall-challenge/assets/7768082/bb5c270f-b593-4c2e-859e-f7d079423591)


Caveat: the backend server is put on freeze mode after 15 minutes of being unused, it takes about 30 seconds for it to come alive again. So, don't strange if it doesn't load super quick at the first time.
For more details: https://community.render.com/t/slow-server-response/13392

## Tech stack
- Backend: NestJS + GraphQL + sqlite
- Frontend: Vite + React + GraphQL + MUI X (Data Grid)

## Backend setup
```bash
# from the project root
cd backend
npm i
npm start
```
The application with be running at http://localhost:3000/graphql

For more information about the backend please refer to the [backend README](backend/README.md)

## Frontend setup
```bash
# from the project root
cd frontend
npm i
npm run dev
```
The application with be running at http://localhost:5173

For more information about the frontend please refer to the [frontend README](frontend/README.md)

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
