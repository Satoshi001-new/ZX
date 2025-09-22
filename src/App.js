import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// connect to Supabase with your env variables
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function syncUser() {
  // Telegram gives us user info automatically
  const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!tg) {
    console.log("No Telegram user found.");
    return;
  }

  const { id, username, language_code } = tg;

  // insert or update the user into Supabase
  const { data, error } = await supabase.from("profiles").upsert({
    id: id.toString(),
    username,
    region: language_code,
  });

  if (error) {
    console.error("❌ Error syncing user:", error);
  } else {
    console.log("✅ User synced:", data);
  }
}

function App() {
  useEffect(() => {
    syncUser();
  }, []);

  return (
    <div>
      <h1>Zillax Mini App</h1>
      <p>Telegram login is syncing with Supabase...</p>
    </div>
  );
}

export default App;
