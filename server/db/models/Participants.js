const knex = require('../knex');

class Participants {
    constructor(user_id, challenge_id) {
        this.user_id = user_id;
        this.challenge_id = challenge_id;
    }

    static async create(user_id, challenge_id) {
        const query = `
            INSERT INTO participants(user_id, challenge_id)
            VALUES (?, ?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [user_id, challenge_id]);
        return new Participants(rows[0]);
    }

    static async findUsersByChallenge(challenge_id) {
        const query = `
            SELECT users.*
            FROM participants
            JOIN users ON participants.user_id = users.id
            WHERE challenge_id = ?
        `;

        const { rows } = await knex.raw(query, [challenge_id]);
        return rows;
    }

    static async findChallengesByUser(user_id) {
        const query = `
            SELECT challenges.*
            FROM participants
            JOIN challenges ON participants.challenge_id = challenges.id
            WHERE user_id = ?
        `;

        const { rows } = await knex.raw(query, [user_id]);
        return rows;
    }

    static async delete(user_id, challenge_id) {
        const query = `
            DELETE FROM participants
            WHERE user_id = ? AND challenge_id = ?
            RETURNING *
        `

        const { rows } = await knex.raw(query, [user_id, challenge_id]);
        return rows;
    }

    static async deleteAll() {
        return await knex('participants').del();
    }
}