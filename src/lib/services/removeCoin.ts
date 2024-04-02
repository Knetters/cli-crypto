import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function removeCoin(amount: number, coin: string, username: string) {
    if (!page) {
        console.error("No user data.");
        return;
    }

    try {
        // Fetch user data
        const { data, error: lobbyError } = await supabase
            .from('users')
            .select('coins')
            .eq("name", username)
            .single();

        if (lobbyError) {
            throw lobbyError;
        }

        if (!data) {
            console.error('User not found.');
            return;
        }

        let coins = data.coins || [];
        let coinIndex = coins.findIndex((c: any) => c.coin === coin);

        if (coinIndex !== -1) {
            // If coin exists, decrease its amount
            coins[coinIndex].amount -= amount;

            // Remove the coin entry if its amount becomes zero or less
            if (coins[coinIndex].amount <= 0) {
                coins.splice(coinIndex, 1);
            }
        } else {
            console.error('Coin not found for removal.');
            return;
        }

        // Update user's coins
        const { error } = await supabase
            .from('users')
            .update({ coins })
            .eq("name", username);

        if (error) {
            throw error;
        }

        console.log('Coins removed successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
}