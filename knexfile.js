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
      database: process.env.STAGING_DB_NAME || 'my_db',  // Use environment variable for staging
      user: process.env.STAGING_DB_USER || 'username',
      password: process.env.STAGING_DB_PASSWORD || 'password',
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
      database: process.env.DATABASE_URL, // Use Render's DATABASE_URL for production
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
