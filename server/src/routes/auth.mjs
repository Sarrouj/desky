// Packages
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config({ path: ".env.local" });

// Middlewares
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import depositorValidationFields from "../utils/depositorValidationFields.mjs";
import bidderValidationFields from "../utils/bidderValidationFields.mjs";
import loginValidationFields from "../utils/loginValidationFields.mjs";

// Schemas
import TempUser from "../mongoose/schemas/TempUser.mjs";
import Admin from "../mongoose/schemas/Admin.mjs";
import Depositor from "../mongoose/schemas/Depositor.mjs";
import Bidder from "../mongoose/schemas/Bidder.mjs";

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Depositor Register
router.post(
  "/auth/register/depositor",
  depositorValidationFields,
  async (req, res, next) => {
    const { depositor_name, depositor_email, depositor_password } = req.body;
    try {
      // Generate a verification token
      const token = jwt.sign(
        { email: depositor_email, type: "depositor" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const tempUser = await TempUser.findOne({ email: depositor_email });
      if (tempUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Save user information temporarily
      await TempUser.create({
        name: depositor_name,
        email: depositor_email,
        password: await bcrypt.hash(depositor_password, 10),
        type: "depositor",
        token,
        tokenExpires: Date.now() + 3600000,
      });

      // Send verification email
      const mailOptions = {
        from: "Desky <your-email@gmail.com>",
        to: depositor_email,
        subject: "Verify Your Email",
        text: "Please click the link to verify your email.",
        html: `<p>Please <a href="http://localhost:3001/verify/${token}">click here</a> to verify your email.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ error: "Failed to send verification email" });
        }
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: "Verification email sent. Please check your inbox.",
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// Bidder Register
router.post(
  "/auth/register/bidder",
  bidderValidationFields,
  async (req, res, next) => {
    const { bidder_name, bidder_email, bidder_password } = req.body;
    try {
      // Generate a verification token
      const token = jwt.sign(
        { email: bidder_email, type: "bidder" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const tempUser = await TempUser.findOne({ email: bidder_email });
      if (tempUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Save user information temporarily
      await TempUser.create({
        name: bidder_name,
        email: bidder_email,
        password: await bcrypt.hash(bidder_password, 10),
        type: "bidder",
        token,
        tokenExpires: Date.now() + 3600000,
      });

      // Send verification email
      const mailOptions = {
        from: "Desky <your-email@gmail.com>",
        to: bidder_email,
        subject: "Verify Your Email",
        text: "Please click the link to verify your email.",
        html: `<p>Please <a href="http://localhost:3001/verify/${token}">click here</a> to verify your email.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .json({ error: "Failed to send verification email" });
        }
        console.log("Email sent: " + info.response);
        res.status(200).json({
          success: "Verification email sent. Please check your inbox.",
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// Email Verification Endpoint
router.get("/auth/verify/:token", async (req, res, next) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the temporary collection
    const tempUser = await TempUser.findOne({ email: decoded.email });

    if (
      !tempUser ||
      tempUser.token !== token ||
      tempUser.tokenExpires < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Move the user information to the appropriate main collection
    let newUser;
    if (tempUser.type === "depositor") {
      newUser = await Depositor.create({
        depositor_name: tempUser.name,
        depositor_email: tempUser.email,
        depositor_password: tempUser.password,
        depositor_review: [],
        depositor_CB: 70,
        isTrusted: false,
        image: {},
      });
    } else if (tempUser.type === "bidder") {
      newUser = await Bidder.create({
        bidder_name: tempUser.name,
        bidder_email: tempUser.email,
        bidder_password: tempUser.password,
        bidder_review: [],
        bidder_CB: 70,
        isTrusted: false,
        image: {},
        saved_offers: [],
      });
    }

    // Remove the temporary user
    await TempUser.deleteOne({ email: tempUser.email });

    res.status(200).json({
      success: `Email verified successfully. ${
        tempUser.type.charAt(0).toUpperCase() + tempUser.type.slice(1)
      } registered.`,
    });
  } catch (err) {
    next(err);
  }
});

// Login
router.post("/auth/login", loginValidationFields, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = {};

    const admin = await Admin.findOne({ email });
    if (admin) {
      user = admin;
      user.role = "admin";
    }

    const depositor = await Depositor.findOne({ email });
    if (depositor) {
      user = depositor;
      user.role = "depositor";
    }

    const bidder = await Bidder.findOne({ email });
    if (bidder) {
      user = bidder;
      user.role = "bidder";
    }

    if (!user._id) {
      return res.status(401).json({ error: "Wrong email" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.depositor_password || user.bidder_password || user.admin_password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // Respond with the user object
    res.status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});


// Middleware to handle errors
router.use(handleErrors);

export default router;
