import { supabase } from "../lib/supabase";

export async function saveProfile(user, region) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      region: region,
    });

  if (error) console.error(error);
  return data;
}
