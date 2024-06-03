// Packages
import express, { text } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config({ path: ".env.local" }); // Load environment variables from .env.local file

// Middlewares
import { handleErrors } from "../middlewares/errorMiddleware.mjs"; // Error handling middleware
import loginValidationFields from "../utils/loginValidationFields.mjs"; // Validation middleware for login
import registerValidationFields from "../utils/registerValidationFields.mjs"; // Validation middleware for registration
import findUserByEmail from "../middlewares/findUserByEmail.mjs"; // Middleware to find user by email

// Schemas
import TempUser from "../mongoose/schemas/TempUser.mjs"; // TempUser schema
import Depositor from "../mongoose/schemas/Depositor.mjs"; // Depositor schema
import Bidder from "../mongoose/schemas/Bidder.mjs"; // Bidder schema

// Nodemailer configuration for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email user from environment variables
    pass: process.env.EMAIL_PASS, // Email password from environment variables
  },
});

// Login route
router.post(
  "/auth/login",
  loginValidationFields,
  findUserByEmail,
  async (req, res, next) => {
    const { password } = req.body; // Extract password from request body
    try {
      const user = req.user; // Get the user from the middleware
      if (!user) {
        return res.status(401).json({ error: "Wrong email" });
      }

      if (!user.password) {
        return res.status(500).json({ error: "User password is missing" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Wrong password" });
      }

      res.status(200).json({
        success: "Login successful",
        id: user._id,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
  }
);

// Register route for temporary users
router.post(
  "/auth/register/tempUser",
  registerValidationFields,
  findUserByEmail,
  async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      const existingUser = req.user; // Get the user from the middleware
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const tempUser = await TempUser.findOne({ email });
      if (tempUser) {
        await TempUser.deleteOne(tempUser);
      }

      const code = Math.floor(100000 + Math.random() * 900000);

      const token = jwt.sign({ email, code }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      await TempUser.create({
        name,
        email,
        password: await bcrypt.hash(password, 10), // Hash the password
        token,
        tokenExpires: new Date(Date.now() + 3600000), // Set token expiry time
        isVerified: false,
      });

      const mailOptions = {
        from: "Desky",
        to: email,
        subject: "Verify Your Email",
        html: `Your verification code is <b>${code}</b>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to send verification email" });
        }
        res.status(200).json({
          token,
          success: "Verification email sent. Please check your inbox.",
        });
      });
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
  }
);

// Email Verification route
router.get("/auth/verify/:token", async (req, res, next) => {
  const { token } = req.params; // Extract token from request parameters
  if (!token) {
    res.status(400).json("The token is required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tempUser = await TempUser.findOne({ email: decoded.email });

    if (
      !tempUser ||
      tempUser.token.code !== token.code ||
      tempUser.tokenExpires < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    if (tempUser.isVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    tempUser.isVerified = true;
    await tempUser.save();

    res.status(200).json({
      success: `Email verified successfully.`,
    });
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
});

// Register route for depositor or bidder
router.post("/auth/register/user", async (req, res, next) => {
  const { userType } = req.body;
  if (!userType) {
    return res.status(400).json({ error: "User type is required" });
  }

  try {
    const tempUser = await TempUser.findOne({ isVerified: true });
    if (!tempUser) {
      return res.status(400).json({ error: "No verified user found" });
    }

    let createdUser;
    if (userType === "depositor") {
      createdUser = await Depositor.create({
        depositor_name: tempUser.name,
        depositor_email: tempUser.email,
        depositor_password: tempUser.password,
        image: tempUser.image || {},
      });
    } else if (userType === "bidder") {
      createdUser = await Bidder.create({
        bidder_name: tempUser.name,
        bidder_email: tempUser.email,
        bidder_password: tempUser.password,
        image: tempUser.image || {},
      });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    await tempUser.deleteOne();

    res.status(200).json({
      success: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } registered successfully`,
      data: {
        email: createdUser.depositor_email || createdUser.bidder_email,
        password: createdUser.depositor_password || createdUser.bidder_password,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GoogleProvider route
router.post("/auth/google", findUserByEmail, async (req, res, next) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Email and name are required" });
  }

  try {
    const user = req.user;
    if (!user) {
      const existingTempUser = await TempUser.findOne({ email });
      if (existingTempUser) {
        await TempUser.deleteOne(existingTempUser);
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const tempUser = await TempUser.create({
        name,
        email,
        password: await bcrypt.hash(name + email, 10), // Create a dummy password
        token,
        tokenExpires: new Date(Date.now() + 3600000),
        isVerified: true,
      });
      return res.status(200).json({
        success: "Registered successfully",
        id: tempUser._id,
        name: tempUser.name,
        email: tempUser.email,
      });
    } else {
      return res.status(200).json({
        success: "Login successfully",
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  } catch (err) {
    next(err);
  }
});

// Middleware to handle errors
router.use(handleErrors);

export default router;
