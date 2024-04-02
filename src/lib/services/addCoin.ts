import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function addCoin(amount: number, coin: string, username: string) {
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
            // If coin already exists, update its amount
            coins[coinIndex].amount += amount;
        } else {
            // If coin doesn't exist, add a new entry
            coins.push({ coin, amount });
        }

        // Update user's coins
        const { error } = await supabase
            .from('users')
            .update({ coins })
            .eq("name", username);

        if (error) {
            throw error;
        }

        console.log('Coins updated successfully.');
    } catch (error) {
        console.error('Error:');
    }
}