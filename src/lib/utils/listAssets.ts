import { fetchCoinByCode } from "$lib/core/api";
import type { ExchangeRatesResponse } from "$lib/core/types";
import { getCoins } from '$lib/services/getCoins';
import { page } from "$app/stores";

export async function listAssets(username: string) {
    if (!page) {
        console.error("Assets not found.");
        return;
    }
    try {
        const userCoins = await getCoins(username);
        let totalValue = 0; // Initialize totalValue variable

        // Loop through each coin in userCoins array
        for (const userCoin of userCoins) {
            const { coin, amount } = userCoin;
            try {
                // Fetch the price of the coin
                const exchangeRatesResponse: ExchangeRatesResponse = await fetchCoinByCode(coin);
                const { rates } = exchangeRatesResponse.data;

                // Calculate the value of the coin in USD
                const coinValueUSD = amount * rates.USD;
                
                // Add the coin's value to the totalValue
                totalValue += coinValueUSD;

                // You can do whatever you want with the price here, for example, logging it
                console.log(`Price of ${coin}: ${rates.USD}, Value in USD: ${coinValueUSD}`);

            } catch (error) {
                console.error(`Failed to fetch price of ${coin}: ${error}`);
            }
        }

        // Now you have the total value of the user's coins in USD
        console.log(`Total value of user's coins in USD: ${totalValue.toFixed(2)}`);
        return totalValue.toFixed(2)

    } catch (error) {
        console.error('Error');
    }
}
