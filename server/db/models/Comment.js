const knex = require('../knex');

class Comment {
    constructor({ content, created_at, user_id, post_id, parent_comment_id }) {
        this.content = content;
        this.created_at = created_at;
        this.user_id = user_id;
        this.post_id = post_id;
        this.parent_comment_id = parent_comment_id;
    }

    static async create({ content, user_id, post_id, parent_comment_id = null }) {
        const query = `
            INSERT INTO comments (content, user_id, post_id, parent_comment_id)
            VALUES (?, ?, ?, ?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [
            content,
            user_id,
            post_id,
            parent_comment_id
        ]);

        return new Comment(rows[0]);
    }

    static async list() {
        const query = `SELECT * FROM comments`;
        const { rows } = await knex.raw(query);
        return rows.map(comment => new Comment(comment));
    }

    static async find(id) {
        const query = `SELECT * FROM comments WHERE id = ?`;
        const { rows } = await knex.raw(query, [id]);
        const comment = rows[0];
        return comment ? new Comment(comment) : null;
    }

    static async findByUser(user_id) {
        const query = `SELECT * FROM comments WHERE user_id = ?`;
        const { rows } = await knex.raw(query, [user_id]);
        return rows.map(comment => new Comment(comment));
    }

    static async findByPost(post_id) {
        const query = `SELECT * FROM comments WHERE post_id = ?`;
        const { rows } = await knex.raw(query, [post_id]);
        return rows.map(comment => new Comment(comment));
    }

    static async editComment(content, id) {
        if (!content?.trim() || id === null) return null;

        const query = `
            UPDATE comments
            SET content = ?
            WHERE id = ?
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [content, id]);
        const updatedComment = rows[0];
        return updatedComment ? new Comment(updatedComment) : null;
    }

    static async delete(id) {
        const query = `
            DELETE FROM comments
            WHERE id = ?
            RETURNING *;
        `;

        const { rows } = await knex.raw(query, [id]);
        return rows[0] ? new Comment(rows[0]) : null;
    }

    static async deleteAll() {
        return await knex('comments').del();
    }
}