const telegramService = require('../services/telegramService');

exports.loginToTelegram = async (req, res) => {
  try {
    const { token } = req.body;
    const loginData = await telegramService.loginWithQR(token);
    successResponse(res, loginData, 'Login URL retrieved successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, message, token } = req.body;
    const response = await telegramService.sendMessage(chatId, message, token);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
