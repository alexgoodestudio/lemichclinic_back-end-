require('dotenv').config();  // Ensure .env is loaded first
const config = require('../../knexfile')[process.env.NODE_ENV || 'development'];
const knex = require('knex')(config);

module.exports = knex;
