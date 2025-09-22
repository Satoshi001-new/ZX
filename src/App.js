import React, { useEffect } from "react";
import { saveTelegramUser } from "./useTelegramAuth";

function App() {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    const user = tg.initDataUnsafe?.user;

    if (user) {
      console.log("👤 Telegram user detected:", user);
      saveTelegramUser(user);
    } else {
      console.log("⚠️ No Telegram user found");
    }
  }, []);

  return (
    <div>
      <h1>🚀 Zillax Mini App</h1>
      <p>Telegram login will auto-sync to Supabase.</p>
    </div>
  );
}

export default App;
