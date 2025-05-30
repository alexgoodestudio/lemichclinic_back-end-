/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('contacts', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable(); 
      table.string('email').notNullable(); 
      table.string('phone').nullable(); 
      table.text('message').notNullable(); 
      table.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('contacts');
  };
  