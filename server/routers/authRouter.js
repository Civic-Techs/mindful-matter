const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);
authRouter.get('/me', authController.showMe);
authRouter.post('/login', authController.login);
authRouter.delete('/logout', authController.logout);
