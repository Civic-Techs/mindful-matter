const challenge = require("../models/challenge");

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await challenge.list();
    res.status(200).send(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching challenges." });
  }
};

exports.getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await challenge.find(id);
    if (!challenge) {
      return res.status(404).send({ message: "Challenge not found." });
    }
    res.status(200).send(challenge);
  } catch (error) {
    console.error("Error fetching challenge by ID:", error);
    res
      .status(500)
      .send({ message: "An error occurred while fetching the challenge." });
  }
};
