// test-pg.js
require('dotenv').config();
console.log('🔍 Testing raw PG connection…');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    console.log('✅ RAW PG connection successful');
    return client.end();
  })
  .catch(err => {
    console.error('❌ RAW PG connection error:', err);
    process.exit(1);
  });
