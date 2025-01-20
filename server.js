const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRouter = require("./api/contact/contact.router");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../front-end/build")));

app.use("/contacts", contactRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
});

app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
