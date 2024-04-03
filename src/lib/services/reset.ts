import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function reset(username: string) {
    if (!page) {
        console.error("No user data.");
        return;
    }

    try {
        // Fetch user data
        const { data, error: lobbyError } = await supabase
            .from('users')
            .select('history, coins')
            .eq("name", username)
            .single();

        if (lobbyError) {
            throw lobbyError;
        }

        if (!data) {
            console.error('User not found.');
            return;
        }
        
        const { error } = await supabase
            .from('users')
            .update({ history: [], coins: [] })
            .eq("name", username);

        if (error) {
            throw error;
        }

        console.log('Portfolio cleared successfully.');
    } catch (error) {
        console.error('Error:');
    }
}