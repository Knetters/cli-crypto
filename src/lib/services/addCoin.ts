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

        const coins = data.coins || [];

        let asset = {
            coin,
            amount,
        };

        coins.push(asset);

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
        console.error('Error');
    }
}