import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function clearHistory(username: string) {
    if (!page) {
        console.error("No user data.");
        return;
    }

    try {
        // Fetch user data
        const { data, error: lobbyError } = await supabase
            .from('users')
            .select('history')
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
            .update({ history: [] }) // Set history to an empty array to clear it
            .eq("name", username);

        if (error) {
            throw error;
        }

        console.log('History cleared successfully.');
    } catch (error) {
        console.error('Error:');
    }
}