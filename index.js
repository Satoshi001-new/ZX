// index.js — bot backend, webhook, and static webapp server
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// env vars (set these in Render: BOT_TOKEN, SERVER_URL, PORT)
const TOKEN = process.env.BOT_TOKEN;
const SERVER_URL = process.env.SERVER_URL || process.env.RENDER_EXTERNAL_URL || "";
const PORT = process.env.PORT || 10000;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN missing. Set BOT_TOKEN in environment variables.");
  process.exit(1);
}

// create bot instance without polling (webhook)
const bot = new TelegramBot(TOKEN, { polling: false });

// Serve the Mini App static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// token-check (safe)
app.get("/token-check", (req, res) => {
  res.json({ tokenSet: !!TOKEN });
});

// Webhook endpoint
// Telegram will POST updates here (we will set webhook to SERVER_URL + '/webhook')
app.post("/webhook", (req, res) => {
  try {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error processing update:", err);
    res.sendStatus(500);
  }
});

// /start handler: sends an inline button that opens the Mini App inside Telegram
bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const webAppUrl = (SERVER_URL || "").replace(/\/$/, "") + "/"; // serve root

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Open Zillax App",
              // web_app is how Telegram opens your web app inside the client
              web_app: { url: webAppUrl }
            }
          ]
        ]
      }
    };

    await bot.sendMessage(chatId, "🔥 Welcome to Zillax — open the app to get started.", keyboard);
  } catch (err) {
    console.error("Error in /start handler:", err);
  }
});

// Example simple text handler (fallback)
bot.on("message", (msg) => {
  // ignore messages that were handled by commands — /start sends the web app
  // but keep a fallback reply so users always get something
  if (!msg.text || msg.text.startsWith("/")) return;
  bot.sendMessage(msg.chat.id, "👋 Open the Zillax app with /start or tap the button I sent.");
});

// Set webhook on startup (keeps Telegram pointed to your deployed server)
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  if (!SERVER_URL) {
    console.warn("SERVER_URL not set. Please set SERVER_URL environment variable to your app URL.");
    console.warn("Webhook not set automatically.");
    return;
  }

  const webhookUrl = (SERVER_URL.replace(/\/$/, "") + "/webhook");
  try {
    await bot.setWebHook(webhookUrl);
    console.log("✅ Webhook set to:", webhookUrl);
  } catch (err) {
    console.error("❌ Failed to set webhook:", err && err.response && err.response.body ? err.response.body : err.message);
  }
});
