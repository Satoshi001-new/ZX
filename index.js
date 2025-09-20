const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Get your token from environment variables
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("❌ BOT_TOKEN is not set in environment variables");
  process.exit(1);
}

// Create bot in webhook mode
const bot = new TelegramBot(TOKEN, { polling: false });

// Webhook endpoint
app.post("/webhook", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Token check
app.get("/token-check", (req, res) => {
  if (TOKEN) {
    res.json({ token: "Token is set!" });
  } else {
    res.json({ token: "No token found" });
  }
});

// Example command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Welcome to Zillax! 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
