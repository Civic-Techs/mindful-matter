const Challenge = require('../models/challenge');

exports.createChallenge = async (req, res) => {
    try {
        // Ensure the request body exists
        if (!req.body) {
            return res.status(400).send({ message: 'Request body is required.' });
        }

        // Extract required fields from the request body
        const { title, description, img, is_contest, created_at, end_time, user_id } = req.body;

        // Validate required fields
        if (!title) {
            return res.status(400).send({
                message: 'Title is required.',
            });
        }

        const chall = await Challenge.create({
            title,
            description,
            img,
            is_contest,
            created_at,
            end_time,
            user_id
        });

        req.session.challId = chall.id;

        res.status(200).send({
            id: chall.id,
            title: chall.title,
            description: chall.description,
            img: chall.img,
            is_contest: chall.is_contest,
            end_time: chall.end_time,
            user_id: chall.user_id
        })
    } catch (error) {
        console.error('Error creating challenge: ', error)
            .status(500)
            .send({ message: 'An error occurred while registering the challenge.' });
    }
}

exports.updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, img, id } = req.body;

        const updateChall = await Challenge.updateChallenge({
            title,
            description,
            img,
            id
        });

        if (!updateChall) {
            return res.status(404).send({ message: 'Challenge not found.' })
        }

        res
            .status(200)
            .send({ message: 'Challenge updated successfully.', challenge: updateChall });
    } catch (error) {
        console.error('Error updating challenge: ', error)
            .status(500)
            .send({ message: 'An error occurred while updating the challenge.' });
    }
}

exports.getAllChallenges = async (req, res) => {
    try {
        const challenges = await challenge.list();
        res.status(200).send(challenges);
    } catch (error) {
        console.error('Error fetching challenges: ', error);
        res
            .status(500)
            .send({ message: 'An error occurred while fetching challenges.' });
    }
}

exports.getChallengeById = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = await challenge.find(id);
        if (!challenge) {
            return res.status(404).send({ message: 'Challenge not found.' });
        }
        res.status(200).send(challenge);
    } catch (error) {
        console.error('Error fetching challenge by ID: ', error);
        res
            .status(500)
            .send({ message: 'An error occurred while fetching the challenge.' });
    }
}

exports.deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Challenge.delete(id);
        if (!deleted) {
            return res.status(404).send({ message: 'Challenge not found.' });
        }
        res.status(200).send({ message: 'Challenge deleted successfully.' });
    } catch (error) {
        console.error('Error deleting challenge: ', error);
        res.status(500).send({ message: 'An error occurred while deleting challenge.' });
    }
};
