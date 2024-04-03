import { render, screen } from "@testing-library/react";
import CompaniesTable from "./CompaniesTable";

jest.mock('@apollo/client', () => {
  const data = {
    companies: [{
        name: "Afterpay",
        exchangeSymbol: "ASX",
        uniqueSymbol: "ASX:APT",
        score: {
            total: 9
        },
        lastPriceClose: {
            price: 44
        },
        id: "46B285BC-B25F-4814-985C-390A4BFA2023"
    }]
};
  return {
    __esModule: true,
    useQuery: jest.fn(() => ({ data })),
  };
});


describe("CompaniesTable", () => {
  it("renders App component with the fetched data", async () => {
    render(<CompaniesTable />);
    const linkElement = await screen.findByText(/Afterpay/i);
    expect(linkElement).toBeInTheDocument();
  });
});
