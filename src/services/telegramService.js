const axios = require('axios');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const { Api } = require("telegram");

const apiId = 23733883; // Replace with your API ID
const apiHash = "0301ab4ad36ceca4c59b305d9fde99e4"; // Replace with your API Hash
const sessionString = "YOUR_SESSION_STRING"; // Replace with a stored session string


const client = new TelegramClient(new StringSession(sessionString), apiId, apiHash, {
  connectionRetries: 5,
});

// Initialize Telegram Client
(async () => {
  console.log("Connecting to Telegram...");
  await client.connect();
  console.log("Telegram client connected!");
})();


exports.loginWithQR = async (token) => {
  const url = `https://api.telegram.org/bot${token}/loginUrl`;
  const response = await axios.get(url);
  return response.data;
};

exports.sendMessage = async (chatId, message, token) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await axios.post(url, {
    chat_id: chatId,
    text: message,
  });
  return response.data;
};
