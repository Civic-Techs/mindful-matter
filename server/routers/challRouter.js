const express = require("express");
const challengeControllers = require("../controllers/challControllers");

const challRouter = express.Router();

challRouter.post("/", challengeControllers.createChallenge);

challRouter.get("/api/challenges/all", challengeControllers.getAllChallenges);
challRouter.get("/api/challenges/:id", challengeControllers.getChallengeById);
challRouter.patch("/api/challenges/:id", challengeControllers.updateChallenge);
challRouter.delete("/api/challenges/:id", challengeControllers.deleteChallenge);
