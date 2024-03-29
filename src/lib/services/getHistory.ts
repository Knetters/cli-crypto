import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function getHistory(username: string) {
    if (!page) {
        console.error("No user data.");
        return [];
    }

    try {
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
            return [];
        }

        const history = data.history || [];
        
        return history;
    } catch (error) {
        console.error('Error', error);
        return [];
    }
}