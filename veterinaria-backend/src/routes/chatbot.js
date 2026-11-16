const express = require('express');
const { responderChatbot } = require('../controllers/chatbot');

const router = express.Router();

router.post('/', responderChatbot);

module.exports = router;
