const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

//middleware
const Token = require("../helpers/token")

router.post('/chat', Token.checkToken  ,chatController.chat);

module.exports = router;
