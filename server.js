require('dotenv').config(); // Make sure this line is at the top
const express = require("express");
const cors = require("cors");
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']); // Use knexfile configuration
const contactRouter = require("./api/contact/contact.router");

const app = express();

app.use(cors());
app.use(express.json());

// Test database connection
knex.raw('SELECT 1')
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// API routes
app.use("/contacts", contactRouter);

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Use the environment port provided by Render, or fallback to 5001 locally
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL from .env:', process.env.DATABASE_URL); // Debugging line
