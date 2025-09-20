const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.BOT_TOKEN;
const SERVER_URL = process.env.SERVER_URL; // e.g. https://zillax.onrender.com

// Create bot instance without polling (we use webhook)
const bot = new TelegramBot(TOKEN, { polling: false });

// Webhook endpoint for Telegram
app.post(`/webhook/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Example command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Welcome to Zillax! 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Set webhook when server starts
  const webhookUrl = `${SERVER_URL}/webhook/${TOKEN}`;
  try {
    await bot.setWebHook(webhookUrl);
    console.log("✅ Webhook set:", webhookUrl);
  } catch (err) {
    console.error("❌ Error setting webhook:", err.message);
  }
});
