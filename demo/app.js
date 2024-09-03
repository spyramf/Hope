require("dotenv").config();
require("./models/db");

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("./models/users");
const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const schemes = require("./models/schemes");

app.use(express.json());

app.use(userRouter);

// /////////////////////////////////////////



// const otpStore = {};

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// console.log(transporter);


// app.post("/request-otp", (req, res) => {
//   const { email } = req.body;



// const emailid = process.env.EMAIL_USER;

// console.log(emailid);

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   // Generate a 6-digit OTP
//   const otp = crypto.randomInt(100000, 999999).toString();

// console.log(email)
//   console.log(otp)
//   // Store the OTP with a timestamp (in a real application, you'd store this in a database)
//   otpStore[email] = { otp, timestamp: Date.now() };

//   // Send the OTP via email
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res
//         .status(500)
//         .json({ message: "Failed to send OTP", error: error.message });
//     }
//     res.status(200).json({ message: "OTP sent successfully" });
//   });




// });

// //////////////////////////////////////////////////


















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
