import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function removeCoin(coin: string, username: string) {
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

        // Find index of the coin to remove
        const index = coins.findIndex((c: any) => c.coin === coin);

        if (index === -1) {
            console.error('Coin not found for this user.');
            return;
        }

        // Remove the coin from the coins list
        coins.splice(index, 1);

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
        console.error('Error:');
    }
}