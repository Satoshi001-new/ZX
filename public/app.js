// app.js — Mini App front-end using Telegram Web App SDK
// When opened inside Telegram WebApp, window.Telegram.WebApp is available.
(function () {
  const tg = window.Telegram.WebApp || null;

  // show user name if available
  const userNameEl = document.getElementById("user-name");
  if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const u = tg.initDataUnsafe.user;
    userNameEl.textContent = `${u.first_name || ""} ${u.last_name || ""}`.trim();
  }

  // Buttons behavior (demo)
  document.getElementById("btn-launch").addEventListener("click", () => {
    if (!tg) {
      alert("Open this inside Telegram to launch a coin.");
      return;
    }
    // example: open a small create-coins popup inside your web app or navigate
    tg.sendData(JSON.stringify({ action: "open_launch" }));
    alert("Launch flow (demo) — in production this opens a form.");
  });

  document.getElementById("btn-discover").addEventListener("click", () => {
    if (!tg) {
      alert("Open this inside Telegram to discover coins.");
      return;
    }
    tg.sendData(JSON.stringify({ action: "open_discover" }));
    alert("Discover flow (demo) — in production this loads trending coins.");
  });

  // notify Telegram main button label (optional)
  if (tg) {
    tg.MainButton.setText("Join Zillax");
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      // example: send payload to bot via tg.sendData
      tg.sendData(JSON.stringify({ action: "main_button_click" }));
      tg.close();
    });
  }
})();
