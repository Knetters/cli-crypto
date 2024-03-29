import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function removeCoin(coinToRemove: string, username: string) {
    if (!page) {
        console.error("Code is not set.");
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

        // Filter out the coin to be removed
        coins = coins.filter(asset => asset.coin !== coinToRemove);

        // Update user's coins
        const { error } = await supabase
            .from('users')
            .update({ coins })
            .eq("name", username);

        if (error) {
            throw error;
        }

        console.log('Coin removed successfully.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}