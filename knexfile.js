require('dotenv').config();  // Add this line to load environment variables
console.log(process.env.DATABASE_URL, "knex file");

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
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './api/migrations',
  },
}

};
