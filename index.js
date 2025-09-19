const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const token = "8349700121:AAHzLQoOQ2fFsggbkifm91QH-H0WFPBcsck"; // replace with your bot token from BotFather
const bot = new TelegramBot(token);
const app = express();

app.use(bodyParser.json());

// Webhook endpoint
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Welcome to Zillax! Your bot is live.");
});

// Default reply for any text
bot.on("message", (msg) => {
  if (msg.text !== "/start") {
    bot.sendMessage(msg.chat.id, "👋 I heard you! Try typing /start.");
  }
});

// Render will assign a port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

