import type { ExchangeRatesResponse } from "./types";

export async function fetchCoinByCode(coin: string): Promise<ExchangeRatesResponse> {
    const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${coin}`);
    if (!response.ok) {
        throw new Error("Failed to fetch coin");
    }
    return response.json() as Promise<ExchangeRatesResponse>;
}