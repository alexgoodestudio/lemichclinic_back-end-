const service = require("./contact.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const emptyContactForm = require("../middleware/emptyContactForm");
const emailExists = require("../middleware/emailExists");
const haveAtSymbol = require("../middleware/haveAtSymbol");

async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data });
}

async function read(req, res) {
  const { contact_id } = req.params;
  const data = await service.read(contact_id);
  if (!data) {
    return res.status(404).json({ error: `Contact with ID ${contact_id} not found` });
  }
  res.status(200).json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const { contact_id } = req.params;
  const existingData = await service.read(contact_id);

  if (!existingData) {
    return res.status(404).json({ error: `Contact with ID ${contact_id} not found` });
  }

  const { name, email, phone, message } = req.body.data;

  const updatedData = {
    ...existingData,
    name,
    email,
    phone,
    message,
  };

  await service.update(contact_id, updatedData);
  res.status(200).json({ data: updatedData });
}

async function destroy(req, res) {
  const { contact_id } = req.params;
  const existingData = await service.read(contact_id);

  if (!existingData) {
    return res.status(404).json({ error: `Contact with ID ${contact_id} not found` });
  }

  await service.destroy(contact_id);
  res.status(204).end();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(read)],
  post: [emptyContactForm, haveAtSymbol, asyncErrorBoundary(create)],
  update: [emptyContactForm, haveAtSymbol, asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(destroy)],
};
