// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require('path');
const migrationsDirectory = path.join(
  __dirname,
  'db/mindful_migrations/migrations'
);
const seedsDirectory = path.join(__dirname, '/db/seeds');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'postgres', // unless you want to use a different user
      password: 'postgres', // unless you changed your password
      database: 'mindful_motion',
    },
    migrations: {
      directory: migrationsDirectory,
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: seedsDirectory,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
