export type CompaniesResponse = {
    companies: Company[];
};

export type Company = {
    lastPriceClose: {
        price: number;
    };
    score: {
        total: number;
    }
} & BaseCompany;

type BaseCompany = {
    id: string;
    name: string;
    uniqueSymbol: string;
    exchangeSymbol: string;
};

export type SanitizedCompany = {
    lastSharePrice: number;
    snowflakeScore: number;
} & BaseCompany;
