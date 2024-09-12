require("dotenv").config();
require("./models/db");

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("./models/users");
const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const schemes = require("./models/schemes");
const UccCreate = require("./models/uccCreate");



app.use(express.json());

app.use(userRouter);









const generateSerialNumber = async () => {
  // Find the last record in the database and get its serial number
  const lastRecord = await UccCreate.findOne().sort({ _id: -1 });
  let nextSerialNumber = "MB00000001"; // Default serial number

  if (lastRecord && lastRecord.serialNumber) {
    // Extract the numeric part, increment it, and pad with leading zeros
    const lastNumber = parseInt(lastRecord.serialNumber.substring(2), 10);
    nextSerialNumber = `MB${String(lastNumber + 1).padStart(8, "0")}`;
  }

  return nextSerialNumber;
};

app.post("/create-ucc", async (req, res) => {
  try {
    const serialNumber = await generateSerialNumber(); // Generate the serial number
    const UCC = crypto.randomInt(1000000000, 9999999999).toString(); // Generate the UCC

    // Create a new entry with the serial number and UCC
    const data = new UccCreate({
      serialNumber: serialNumber,
      Ucc: UCC,
      otherField: req.body.otherField, // Add any additional data from the request
    });

    const result = await data.save(); // Save to the database
    res.send(result); // Send the result back to the client
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("An error occurred while saving the data.");
  }
});







app.post("/test", async (req, res) => {
  let data = new s_names(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

app.post("/test-name", async (req, res) => {
  let data = new schemes(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

app.get("/list", async (req, res) => {
  let data = await schemes.find();
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(8000, () => {
  console.log("port is listening");
});

// mongodb + srv://spyra:<password>@cluster0.qokizow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
