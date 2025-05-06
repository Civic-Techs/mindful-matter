const knex = require('../knex');

class Category {
    constructor({ title }) {
        this.title = title;
    }

    static async create({ title }) {
        const query = `
            INSERT INTO categories (title)
            VALUES (?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [title]);

        return new Category(rows[0]);
    }

    static async list() {
        const query = `SELECT * FROM categories`;
        const { rows } = await knex.raw(query);
        return rows.map(category => new Category(category));
    }

    static async find(id) {
        const query = `SELECT * FROM categories WHERE id = ?`;
        const { rows } = await knex.raw(query, [id]);
        const category = rows[0];
        return category ? new Category(category) : null;
    }

    static async editCategory(title, id) {
        if (!title?.trim() || id === null) return null;

        const query = `
            UPDATE categories
            SET title = ?
            WHERE id = ?
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [title, id]);
        const updatedCategory = rows[0];
        return updatedCategory ? new Category(updatedCategory) : null;
    }

    static async deleteCategory(id) {
        const query = `
            DELETE FROM categories
            WHERE id = ?
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [id]);
        return rows[0] ? new Category(rows[0]) : null;
    }

    static async deleteAll() {
        return await knex('categories').del();
    }
}