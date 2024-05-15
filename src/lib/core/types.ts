export interface CoinDTO {
    [key: string]: string; // Adding the trend property as an optional string
}

export interface ExchangeRatesResponse {
    data: {
        currency: string;
        rates: CoinDTO;
    };
}
