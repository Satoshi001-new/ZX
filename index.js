const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 10000;

// replace this with your bot token
const TOKEN = process.env.BOT_TOKEN || 8349700121:AAHzLQoOQ2fFsggbkifm91QH-H0WFPBcsck;

// bot in webhook mode
const bot = new TelegramBot(TOKEN, { polling: false });

// middleware
app.use(bodyParser.json());

// webhook endpoint
app.post(`/webhook/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// test route
app.get("/", (req, res) => {
  res.send("✅ Zillax bot server is running.");
});

// example: reply to "/start"
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Welcome to Zillax bot!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
