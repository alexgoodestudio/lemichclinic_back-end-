const express = require("express");
const cors = require("cors");
const contactRouter = require("./api/contact/contact.router");  // Import your router

const app = express();

// Enable CORS for all origins (or specify allowed origins)
app.use(cors());  // If you want to restrict, replace `app.use(cors())` with `app.use(cors({ origin: 'http://localhost:3000' }))`

// Middleware to parse JSON bodies
app.use(express.json());

// Set up your routes
app.use("/contacts", contactRouter);

// Error handling middleware (optional)
app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" });
});

// Start server
app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
