const express = require("express");
const cors = require("cors");
const contactRouter = require("./api/contact/contact.router");
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/contacts", contactRouter);

// Redirect all other routes to the frontend URL
app.get("*", (req, res) => {
  res.redirect("https://lemichclinic-front-end.onrender.com");
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
