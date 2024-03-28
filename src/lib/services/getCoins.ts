import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function getCoins(username: string) {
    if (!page) {
        console.error("Code is not set.");
        return [];
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
            return [];
        }

        const coins = data.coins || [];
        
        return coins;
    } catch (error) {
        console.error('Error', error);
        return [];
    }
}