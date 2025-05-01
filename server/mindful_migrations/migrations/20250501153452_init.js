/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.date('DOB').notNullable();
      table.string('Bio').notNullable();
      // table.blob('profile_img');
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
    })
    .createTable('challenges', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('img');
      table.boolean('isContest');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('end_time').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      // Foreign keys
      table.foreign('user_id').references('id').inTable('users');
    })
    .createTable('post', function (table) {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      // table.blob('img');
      table.integer('votes').notNullable();
      table.boolean('isWinner');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.integer('challenge_id').unsigned().notNullable();
      // Foreign keys
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('challenge_id').references('id').inTable('challenges');
    })
    .createTable('comments', function (table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.integer('post_id').unsigned().notNullable();
      // Foreign keys
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('post_id').references('id').inTable('post');
    })
    .createTable('categories', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
    })
    .createTable('category_challenges', function (table) {
      table.increments('id').primary();
      table.integer('category_id').unsigned().notNullable();
      table.integer('challenge_id').unsigned().notNullable();
      // Foreign keys
      table.foreign('category_id').references('id').inTable('categories');
      table.foreign('challenge_id').references('id').inTable('challenges');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('category_challenges')
    .dropTable('categories')
    .dropTable('comments')
    .dropTable('challenges')
    .dropTable('post')
    .dropTable('users');
};
