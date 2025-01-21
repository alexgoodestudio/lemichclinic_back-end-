const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRouter = require("./api/contact/contact.router");
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the correct path
app.use(express.static(path.join(__dirname, "front-end/build")));

app.use("/contacts", contactRouter);

// Serve the frontend's index.html for any unrecognized route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end/build/index.html"));
});

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
