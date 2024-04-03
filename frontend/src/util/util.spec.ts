import { companiesData } from '../../tests/fixtures';
import { transformCompaniesResponse } from './util';

describe("util", () => {
    describe("transformCompaniesResponse", () => {
        it("returns a sanitized company response", () => {
            const result = transformCompaniesResponse(companiesData);
            expect(result).toEqual([{
                name: "Afterpay",
                exchangeSymbol: "ASX",
                uniqueSymbol: "ASX:APT",
                snowflakeScore: 9,
                lastSharePrice: 44,
                id: "46B285BC-B25F-4814-985C-390A4BFA2023"
            }])
        });
    });
});
