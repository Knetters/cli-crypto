import { supabase } from '$lib/supabase';
import { page } from "$app/stores";

export async function addHistory(message: string, username: string) {
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

        const date: string = generateDate();
        const history = data.history || [];

        let line = {
            message,
            date,
        };

        history.push(line);

        const { error } = await supabase
            .from('users')
            .update({ history })
            .eq("name", username);

        if (error) {
            throw error;
        }

        console.log('History updated successfully.');
    } catch (error) {
        console.error('Error');
    }
}

function generateDate(): string {
  const currentDate: Date = new Date();
  const month: number = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const day: number = currentDate.getDate();
  const year: number = currentDate.getFullYear();

  // Pad single digit month or day with leading zero
  const monthString: string = month < 10 ? '0' + month : month.toString();
  const dayString: string = day < 10 ? '0' + day : day.toString();

  return `${monthString}-${dayString}-${year}`;
}