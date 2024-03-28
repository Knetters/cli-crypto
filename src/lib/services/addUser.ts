import { supabase } from "$lib/supabase";
import { page } from "$app/stores";

export async function addUser(name: string) {
  if (!page) {
    console.error("No user found");
    return;
  }

  // Check if user with the same name already exists
  const { data: existingUsers, error: existingUsersError } = await supabase
    .from("users")
    .select("id")
    .eq("name", name);

  if (existingUsersError) {
    console.error("Error checking for existing user:", existingUsersError.message);
    return;
  }

  if (existingUsers.length > 0) {
    return;
  }

  // Generate random ID for the new user
  const userId = generateRandomId();

  // Insert the new user into the database
  const { data: newUser, error: addUserError } = await supabase
    .from("users")
    .insert([{ id: userId, name: name }]);

  if (addUserError) {
    console.error("Error adding user:", addUserError.message);
    return;
  }
}

function generateRandomId(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const length = 20;
  let randomId = "";

  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomId;
}