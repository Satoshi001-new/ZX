const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.RENDER_EXTERNAL_URL || "https://zillax.onrender.com";
const PORT = process.env.PORT || 3000;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN is missing in environment variables");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN);
const webhookUrl = `${URL}/webhook/${TOKEN}`;

// ✅ Set webhook automatically on startup
bot.setWebHook(webhookUrl).then(() => {
  console.log(`✅ Webhook set to: ${webhookUrl}`);
}).catch(err => {
  console.error("❌ Failed to set webhook:", err.message);
});

// ✅ Handle Telegram updates
app.post(`/webhook/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ Bot command: /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "🔥 Welcome to Zillax! 🚀\nYour journey starts here.");
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Zillax server is running");
});

// ✅ Token check route (debugging)
app.get("/check", (req, res) => {
  res.json({ ok: true, token: TOKEN ? "present" : "missing" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
