const express = require("express");
const cors = require("cors");
const contactRouter = require("./api/contact/contact.router");
const app = express();

app.use(cors());
app.use(express.json());

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

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
