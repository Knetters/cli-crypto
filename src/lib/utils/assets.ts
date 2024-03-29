import { fetchCoinByCode } from "$lib/core/api";
import type { ExchangeRatesResponse } from "$lib/core/types";
import { getCoins } from '$lib/services/getCoins';
import { page } from "$app/stores";

export async function listAssets(username: string) {
    if (!page) {
        console.error("Assets not found.");
        return [];
    }

    const assetsList = [];

    try {
        const userCoins = await getCoins(username);

        for (const userCoin of userCoins) {
            const { coin, amount } = userCoin;
            try {
                const exchangeRatesResponse: ExchangeRatesResponse = await fetchCoinByCode(coin);
                const { rates } = exchangeRatesResponse.data;

                assetsList.push({
                    coin,
                    amount,
                    rates
                });

            } catch (error) {
                console.error(`Failed to fetch price of ${coin}: ${error}`);
            }
        }
        return assetsList;

    } catch (error) {
        console.error('Error');
        return [];
    }
}

export async function totalValue(username: string) {
    if (!page) {
        console.error("Assets not found.");
        return;
    }
    try {
        const userCoins = await getCoins(username);
        let totalValue = 0;

        for (const userCoin of userCoins) {
            const { coin, amount } = userCoin;
            try {
                const exchangeRatesResponse: ExchangeRatesResponse = await fetchCoinByCode(coin);
                const { rates } = exchangeRatesResponse.data;
                const coinValueUSD = amount * rates.USD;

                totalValue += coinValueUSD;

            } catch (error) {
                console.error(`Failed to fetch price of ${coin}: ${error}`);
            }
        }
        return totalValue.toFixed(2);

    } catch (error) {
        console.error('Error');
    }
}
