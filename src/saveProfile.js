import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export async function saveProfile(user, region) {
  const { id, username, first_name } = user;

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: id.toString(),
      username: username || first_name, // fallback if no @username
      region,
    });

  if (error) {
    console.error("❌ Error saving profile:", error);
  } else {
    console.log("✅ Profile saved:", data);
  }
}
