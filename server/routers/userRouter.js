const express = require('express');
const userControllers = require('../controllers/userControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const userRouter = express.Router();

userRouter.post('/', userControllers.createUser);

userRouter.get('/:id', userControllers.getUserById);
userRouter.patch('/:id', checkAuthentication, userControllers.updateUser);
userRouter.delete('/:id', checkAuthentication, userControllers.deleteUser);

module.exports = userRouter;
