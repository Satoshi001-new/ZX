
import express from "express";
import TelegramBot from "node-telegram-bot-api";

const token = "YOUR_BOT_TOKEN"; // replace with your actual bot token
const url = "https://zillax.onrender.com"; // your Render service URL

const bot = new TelegramBot(token, { polling: false });
const app = express();

app.use(express.json());

// Set webhook
bot.setWebHook(`${url}/bot${token}`);

// Handle webhook
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Simple command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🚀 Zillax bot is live via Render Webhook!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
