const service = require("./contact.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const emptyContactForm = require("../middleware/emptyContactForm");
const emailExists = require("../middleware/emailExists");
const haveAtSymbol = require("../middleware/haveAtSymbol");

async function list(req, res) {
  try {
    const data = await service.list();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error in list contacts:", error);  // Detailed log
    res.status(500).json({ error: "Failed to retrieve contacts" });
  }
}

async function read(req, res) {
  console.log("hi")
  const { contact_id } = req.params;
  console.log("Contact ID", contact_id)
  try {
    const data = await service.read(contact_id);
    if (!data) {
      return res.status(404).json({ error: `Contact with ID ${contact_id} not found` });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error occurred:", error);  // Log the error to see what is failing
    res.status(500).json({ error: "Failed to retrieve contact" });
  }
}

async function create(req, res) {
  console.log("create")
  try {
    const { name, email, phone, message } = req.body.data;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const existingContact = await service.readByEmail(email);
    if (existingContact) {
      return res.status(400).json({ error: `Contact with email ${email} already exists` });
    }

    const data = await service.create(req.body.data);
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
}

async function update(req, res) {
  const { contact_id } = req.params;
  console.log("update controller function")
  try {
    const existingData = await service.read(contact_id);

    if (!existingData) {
      return res.status(404).json({ error: `Contact with ID ${contact_id} not found` });
    }

    const { name, email, phone, message } = req.body.data;
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedData = {
      ...existingData,
      name,
      email,
      phone,
      message,
    };

    const updatedContact = await service.update(contact_id, updatedData);
    res.status(200).json({ data: updatedContact });
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
}

async function destroy(req, res) {
  const { contact_id } = req.params;
  console.log("Attempting to delete contact with ID:", contact_id);

  try {
    const existingData = await service.read(contact_id);
    console.log("Existing data:", existingData);

    if (!existingData) {
      return res.status(404).json({ error: `Contact with ID ${contact_id} not found` });
    }

    await service.destroy(contact_id);
    console.log("Successfully deleted contact with ID:", contact_id);
    res.status(204).end();
  } catch (error) {
    console.error("Error in destroy controller:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(read)],
  post: [emptyContactForm, haveAtSymbol, asyncErrorBoundary(create)],
  update: [emptyContactForm, haveAtSymbol, asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(destroy)],
};
