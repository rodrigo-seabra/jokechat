const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

//middleware
const Middleware = require("../middlewares/middleware")
const Token = require("../helpers/token")

router.post('/chat', Token.checkToken , Middleware.requestLimiter() ,chatController.chat);

module.exports = router;
