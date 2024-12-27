const express = require('express');
const router = express.Router();
const telegramController = require('../controllers/telegramController');

router.post('/send', telegramController.sendMessage);
router.post('/login', telegramController.loginToTelegram);

module.exports = router;
