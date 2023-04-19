const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const { connectMongo } = require("./db/connection");
const { contactRouter } = require("./src/routers/contactsRouter.js");

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/contacts", contactRouter);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error at a server launch:", err);
      }
      console.log(`Server works at port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
// app.listen(PORT, (err) => {
//   if (err) {
//     console.error("Error at a server launch:", err);
//   }
//   console.log(`Server works at port: ${PORT}`);
// });
