const knex = require('../knex');

class Post {
    constructor({ title, description, img, is_winner, created_at, user_id, challenge_id }) {
        this.title = title;
        this.description = description;
        this.img = img;
        this.is_winner = is_winner;
        this.created_at = created_at;
        this.user_id = user_id;
        this.challenge_id = challenge_id;
    }

    static async create({ title, description = '', img = '', user_id, challenge_id }) {
        const query = `
            INSERT INTO posts (title, description, img, user_id, challenge_id)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [
            title,
            description,
            img,
            user_id,
            challenge_id
        ]);

        return new Post(rows[0]);
    }

    static async setWinner(id) {
        const query = `
            UPDATE posts
            SET is_winner = true
            WHERE id = ?
            RETURNING *;
        `;

        const { rows } = await knex.raw(query, [id]);
        return rows[0] ? new Post(rows[0]) : null;
    }

    static async list() {
        const query = `SELECT * FROM posts`;
        const { rows } = await knex.raw(query);
        return rows.map(post => new Post(post));
    }

    static async find(id) {
        const query = `SELECT * FROM posts WHERE id = ?`;
        const { rows } = await knex.raw(query, [id]);
        const post = rows[0];
        return post ? new Post(post) : null;
    }

    static async findByUser(user_id) {
        const query = `SELECT * FROM posts WHERE user_id = ?`;
        const { rows } = await knex.raw(query, [user_id]);
        return rows.map(post => new Post(post));
    }

    static async findByChallenge(challenge_id) {
        const query = `SELECT * FROM posts WHERE challenge_id = ?`;
        const { rows } = await knex.raw(query, [challenge_id]);
        return rows.map(post => new Post(post));
    }

    static async editPost(title, description, img, id) {
        if (id === undefined) return null;

        const fields = [];
        const updates = [];

        if (title?.trim()) {
            updates.push('title = ?');
            fields.push(title);
        }
        if (description?.trim()) {
            updates.push('description = ?');
            fields.push(description);
        }
        if (img?.trim()) {
            updates.push('img = ?');
            fields.push(img);
        }

        if (updates.length === 0) return null;

        fields.push(id);

        const query = `
            UPDATE posts
            SET ${updates.join(', ')}
            WHERE id = ?
            RETURNING *
        `;

        const { rows } = await knex.raw(query, fields);
        const updatedPost = rows[0];
        return updatedPost ? new Post(updatedPost) : null;
    }

    static async delete(id) {
        const query = `
            DELETE FROM posts
            WHERE id = ?
            RETURNING *;
        `;

        const { rows } = await knex.raw(query, [id]);
        return rows[0] ? new Post(rows[0]) : null;
    }

    static async deleteAll() {
        return knex('posts').del();
    }
}