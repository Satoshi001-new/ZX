// Load Telegram bot library
const TelegramBot = require('node-telegram-bot-api');

// Your bot token (from BotFather)
const token = "8349700121:AAHzLQoOQ2fFsggbkifm91QH-H0WFPBcsck";

// Create bot
const bot = new TelegramBot(token, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Welcome to Zillax! 🚀 \nYour gateway to creating & discovering coins.");
});

// Example button menu
bot.on("message", (msg) => {
  if (msg.text.toLowerCase() === "menu") {
    bot.sendMessage(msg.chat.id, "Choose an option:", {
      reply_markup: {
        keyboard: [
          ["📢 Announcements", "🌎 Discover"],
          ["🚀 Launch Coin", "👤 Profile"]
        ],
        resize_keyboard: true
      }
    });
  }
});
