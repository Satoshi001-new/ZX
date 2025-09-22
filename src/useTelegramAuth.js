import { supabase } from "./supabase";

export async function saveTelegramUser(userData) {
  if (!userData || !userData.id) return;

  const { id, username, first_name, last_name } = userData;

  // Temporary default region (later detect from IP or user choice)
  const region = "NG";

  const { error } = await supabase.from("profiles").upsert({
    id,
    telegram_id: id.toString(),
    username,
    first_name,
    last_name,
    region,
  });

  if (error) {
    console.error("❌ Error saving Telegram user:", error);
  } else {
    console.log("✅ Telegram user saved/updated successfully.");
  }
}
