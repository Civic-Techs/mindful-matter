const knex = require('../knex');

class CategoryChallenges {
    constructor(category_id, challenge_id) {
        this.category_id = category_id;
        this.challenge_id = challenge_id;
    }

    static async create(category_id, challenge_id) {
        const query = `
            INSERT INTO category_challenges (category_id, challenge_id)
            VALUES (?, ?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [category_id, challenge_id]);
        return new CategoryChallenges(rows[0]);
    }

    static async findCategoriesByChallenge(challenge_id) {
        const query = `
            SELECT categories.*
            FROM category_challenges
            JOIN categories ON category_challenges.category_id = categories.id
            WHERE category_challenges.challenge_id = ?
        `

        const { rows } = await knex.raw(query, [challenge_id]);

        return rows;
    }

    static async findChallengesByCategory(category_id) {
        const query = `
            SELECT challenges.*
            FROM category_challenges
            JOIN challenges ON category_challenges.challenge_id = challenges.id
            WHERE category_challenges.category_id = ?
        `;

        const { rows } = await knex.raw(query, [category_id]);

        return rows;
    }

    static async delete(category_id, challenge_id) {
        const query = `
            DELETE FROM category_challenges
            WHERE category_id = ? AND challenge_id = ?
            RETURNING *
        `;
        const { rows } = await knex.raw(query, [category_id, challenge_id]);
        return rows[0] ? new CategoryChallenges(rows[0]) : null;
    }

    static async deleteAll() {
        return await knex('category_challenges').del();
    }
}