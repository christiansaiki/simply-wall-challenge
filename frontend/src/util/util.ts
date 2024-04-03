import { CompaniesResponse, Company, SanitizedCompany } from "../types/types";

export const transformCompaniesResponse = (data: CompaniesResponse): SanitizedCompany[] => {
    return data.companies.map((company: Company) => {
        return {
            id: company.id,
            name: company.name,
            snowflakeScore: company.score.total,
            uniqueSymbol: company.uniqueSymbol,
            exchangeSymbol: company.exchangeSymbol,
            lastSharePrice: company.lastPriceClose.price
        }
    });
}
