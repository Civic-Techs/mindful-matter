const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class User {
    #passwordHash = null;

    constructor({ id, name, dob, username, email, password_hash, bio, profile_img, created_at }) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.username = username;
        this.#passwordHash = password_hash;
        this.bio = bio;
        this.profile_img = profile_img;
        this.created_at = created_at;
    }

    isValidPassword = async (password) => {
        return authUtils.isValidPassword(password, this.#passwordHash);
    }

    static async create({ name, dob, bio = '', profile_img_src = '', email, username, password }) {
        const passwordHash = await authUtils.hashPassword(password);
        const profile_img = profile_img_src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLTeg_bOJsXMkmRDM-YKCtqy91t0Way8KP99OFb53AA&s';

        const query = `
            INSERT INTO users (name, dob, bio, profile_img, email, username, password)
            VALUES(?, ?, ?, ?, ?, ?, ?)
            RETURNING *
        `;

        const { rows } = await knex.raw(query, [
            name,
            dob,
            bio,
            profile_img,
            email,
            username,
            passwordHash
        ]);

        return new User(rows[0]);
    }

    static async list() {
        const query = `SELECT * FROM users`;
        const { rows } = await knex.raw(query);
        return rows.map(user => new User(user));
    }

    static async find (id) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const { rows } = await knex.raw(query, [id]);
        const user = rows[0];
        return user ? new User(user) : null;
    }

    static async findByUsername(username) {
        const query = `SELECT * FROM users WHERE username = ?`;
        const { rows } = await knex.raw(query, [username]);
        const user = rows[0];
        return user ? new User(user) : null;
    }

    static async editUser({ id, name, bio, profile_img, email, username, password }) {
        const fields = [];
        const updates = [];

        if (name) {
            updates.push('name = ?');
            fields.push(name);
        }
        if (bio) {
            updates.push('bio = ?');
            fields.push(bio);
        }
        if (profile_img) {
            updates.push('profile_img = ?');
            fields.push(profile_img);
        }
        if (email) {
            updates.push('email = ?');
            fields.push(email);
        }
        if (username) {
            updates.push('username = ?');
            fields.push(username);
        }
        if (password) {
            updates.push('password_hash = ?');
            fields.push(await authUtils.hashPassword(password));
        }

        if (updates.length === 0) return null;

        fields.push(id);

        const query = `
        UPDATE users
        SET ${updates.join(', ')}
        WHERE id = ?
        RETURNING *;
    `;

        const { rows } = await knex.raw(query, fields);
        return rows[0] ? new User(rows[0]) : null;
    }

    static async deleteAll() {
        return knex('users').del();
    }
}