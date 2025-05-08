const express = require('express');
const challengeControllers = require('../controllers/challControllers');

const challRouter = express.Router();

challRouter.post('/', challengeControllers.createChallenge);

challRouter.get('/all', challengeControllers.getAllChallenges);
challRouter.get('/:id', challengeControllers.getChallengeById);
challRouter.patch('/:id', challengeControllers.updateChallenge);
challRouter.delete('/:id', challengeControllers.deleteChallenge);
