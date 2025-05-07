const express = require('express');
const authControllers = require('../controllers/authController');
const checkAuthentication = require('../middleware/checkAuthentication');

const authRouter = express.Router();

authRouter.post('/register', authControllers.registerUser);
authRouter.get('/me', authControllers.showMe);
authRouter.post('/login', authControllers.login);
authRouter.delete('/logout', authControllers.logout);
