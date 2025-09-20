require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// --- Health route (to confirm service is alive) ---
app.get("/health", (req, res) => {
  res.send({ status: "ok", uptime: process.uptime() });
});

// --- Example webhook endpoint ---
app.post("/webhook", (req, res) => {
  try {
    const secret = process.env.WEBHOOK_SECRET;
    if (!secret) {
      return res.status(500).send("Webhook secret not set in environment.");
    }

    console.log("Webhook received:", req.body);
    res.status(200).send("Webhook received successfully!");
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Server error.");
  }
});

// --- Example route using your TOKEN ---
app.get("/token-check", (req, res) => {
  const token = process.env.TOKEN;
  if (!token) {
    return res.status(500).send("TOKEN not set in environment.");
  }
  res.send({ message: "Token loaded successfully!", token: token });
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Zillax server is running on port ${PORT}`);
});
