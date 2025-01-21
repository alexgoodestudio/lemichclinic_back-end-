const knex = require("../db/connection");

// function list() {
//   return knex("contacts").select("*").orderBy("created_at", "desc");
// }

function list() {
  console.log("Executing query to fetch contacts...");
  return knex("contacts")
    .select("*")
    .orderBy("created_at", "desc")
    .then((data) => {
      console.log("Fetched contacts from database:", data);
      return data;
    })
    .catch((err) => {
      console.error("Error in knex query:", err);
      throw err;
    });
}

function read(contact_id) {
  console.log("read function called with contact_id:", contact_id);
  return knex("contacts")
    .select("*")
    .where({ id: contact_id }) // Use 'id' instead of 'contact_id'
    .first()
    .catch((err) => {
      console.error("Error in read query:", err);
      throw err;  
    });
}


function readByEmail(email) {
  return knex("contacts").select("*").where({ email }).first();
}

function create(contact) {
  return knex("contacts")
    .insert(contact)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(contact_id, updatedContact) {
  return knex("contacts")
    .where({id: contact_id })
    .update(updatedContact, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(contact_id) {
  return knex("contacts").where({ id: contact_id }).del();
}



module.exports = {
  list,
  read,
  readByEmail, 
  create,
  update,
  destroy,
};
