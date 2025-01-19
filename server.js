const express = require("express");
const cors = require("cors");
const contactRouter = require("./api/contact/contact.router");  
const app = express();

app.use(cors());  
app.use(express.json());

app.use("/contacts", contactRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});
