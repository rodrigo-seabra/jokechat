const express = require('express');
const userController = require("../controllers/userController")
const router = express.Router();


router.post("/register", userController.register);
router.get("/checkuser", userController.checkUser);
router.get("/:id", userController.getUserById);
router.post("/login", userController.login);


module.exports = router;