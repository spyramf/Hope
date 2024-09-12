const User = require("../models/users");
const P_user = require("../models/users");
const jwt = require("jsonwebtoken");
const schemes = require("../models/schemes");
const cloudinary = require("../helper/imageupload");
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.createUser = async (req, res) => {
  const { mobile, email, password } = req.body;

  console.log(req.body);

  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This Email is already in use, try Sign-In",
    });
  const user = await User({
    mobile,
    email,
    password,
  });

  // console.log(user);

  await user.save();

  res.json({ success: true, user });

  console.log(res.json);
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "user not found,with the given email",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "email / password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    mobile: user.mobile,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
  };
  res.json({ success: true, user: userInfo, user, token });
};

exports.uploadProfile = async (req, res) => {
  const { user } = req;

  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });

  console.log(req.file);

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `$(user._id)_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    console.log(result);

    await User.findByIdAndUpdate(user._id, { avatar: result.url });
    res.status(201).json({ success: true, message: "your file updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "sever error" });
    console.log("error while uploading profile image", error.message);
  }
};

exports.enterPan = async (req, res) => {
  const { dob, firstName, lastName, pan } = req.body;

  const { user } = req;
  console.log(user._id);

  console.log(req.body.data);

  await User.findByIdAndUpdate(user._id, req.body.data);

  res.status(201).json({ success: true, message: "your data updated" });
};

exports.personalDetails = async (req, res) => {
  const { add, pin, city, state } = req.body;

  const { user } = req;
  console.log(user._id);

  console.log(req.body.data);

  await User.findByIdAndUpdate(user._id, req.body.data);

  res.status(201).json({ success: true, message: "your data updated" });
};

exports.NomineeDetail = async (req, res) => {
  const { n_name, n_dob, n_pan, n_relation } = req.body;

  const { user } = req;
  console.log(user._id);

  console.log(req.body);

  await User.findByIdAndUpdate(user._id, req.body);

  res.status(201).json({ success: true, message: "your data updated" });
};

exports.BankDetail = async (req, res) => {
  const { ifsc, accNo, bankName, accType } = req.body;

  const { user } = req;
  console.log(user._id);

  console.log(req.body);

  await User.findByIdAndUpdate(user._id, req.body);

  res.status(201).json({ success: true, message: "your data updated" });
};

exports.uccDetails = async (req, res) => {
  const { ucc } = req.body;

  const { user } = req;
  console.log(user._id);

  console.log(req.body);

  await User.findByIdAndUpdate(user._id, req.body);

  res.status(201).json({ success: true, message: "your data updated" });
};

exports.annualIncome = async (req, res) => {
  const { occupation, gender, taxStatus } = req.body;

  const { user } = req;
  console.log(user._id);

  console.log(req.body);

  await User.findByIdAndUpdate(user._id, req.body);

  res.status(201).json({ success: true, message: "your data updated" });
};

exports.s_data = async (req, res) => {
  let data = await schemes.find();
  res.send(data);
};

exports.u_data = async (req, res) => {
  let data = await User.find();
  res.send(data);
};

// Create the otpStore object here or in a different module if needed
const otpStore = {};

exports.emailOtp = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(1000, 9999).toString();

  // Store the OTP with a timestamp
  otpStore[email] = { otp, timestamp: Date.now() };

  // Send the OTP via email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your Money Bharat OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP", error: error.message });
    }
    res.status(200).json({ message: "OTP sent successfully", success: "true" });
  });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  const isExpired = Date.now() - storedOtp.timestamp > 10 * 60 * 1000; // 10 minutes expiration

  if (isExpired) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (storedOtp.otp === otp) {
    delete otpStore[email];
    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
////////////////

exports.signOut = async (req, res) => {
  try {
    // Check for the Authorization header
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token
      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Authorization failed!" });
      }

      // Retrieve the user's tokens array
      const tokens = req.user.tokens || [];

      // Filter out the current token
      const newTokens = tokens.filter((t) => t.token !== token);

      // Update the user's tokens array
      await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });

      // Respond with a success message
      return res.json({ success: true, message: "Signed out successfully" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Authorization header missing!" });
    }
  } catch (error) {
    console.error("Error in signOut:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during sign out" });
  }
};
