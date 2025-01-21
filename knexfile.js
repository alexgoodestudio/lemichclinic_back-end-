/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    migrations: {
      directory: './api/migrations',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1', // localhost for staging
      user: 'lemich_clinic_user', // Database username
      password: 'G9pnxcYtnNPyELtMQ8SjBZB0wvfieUVk', // Database password
      database: 'lemich_clinic', // Database name
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
      connectionString: process.env.DATABASE_URL, // Get the DATABASE_URL from environment variable (Render)
      ssl: {
        rejectUnauthorized: false, // Disable SSL validation for certain environments (Render requires SSL)
      },
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
