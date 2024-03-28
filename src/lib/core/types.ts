export interface CoinDTO {
    [key: string]: string;
}

export interface ExchangeRatesResponse {
    data: {
        currency: string;
        rates: CoinDTO;
    };
}