// Packages
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

// Middlewares
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import findUserByEmail from "../middlewares/findUserByEmail.mjs";
import loginValidationFields from "../utils/loginValidationFields.mjs";
import registerValidationFields from "../utils/registerValidationFields.mjs";
import { transporter } from "../utils/emailSend.mjs";

// Schemas
import TempUser from "../mongoose/schemas/TempUser.mjs";
import Depositor from "../mongoose/schemas/Depositor.mjs";
import Bidder from "../mongoose/schemas/Bidder.mjs";

// Login route
router.post(
  "/auth/login",
  loginValidationFields,
  findUserByEmail,
  async (req, res, next) => {
    const { email, password } = req.body;
    const user = req.user;
    try {
      if (!user) {
        return res.status(401).json({ error: "Wrong email" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Wrong password" });
      }

      res.status(200).json({
        success: "Login successful",
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      next(err);
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
    const user = req.user;
    try {
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const tempUser = await TempUser.findOne({ email });
      if (tempUser) {
        await TempUser.deleteOne(tempUser);
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      await TempUser.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        token,
        tokenExpires: new Date(Date.now() + 3600000),
        isVerified: false,
      });

      const mailOptions = {
        from: "Desky",
        to: email,
        subject: "Verify Your Email",
        text: "Please click the link to verify your email.",
        html: `<p>Please <a href="http://localhost:3000/en/Sign-Up/verify-email/verified?token=${token}">click here</a> to verify your email.</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Failed to send verification email" });
        }
        res.status(200).json({
          success: "Verification email sent. Please check your inbox.",
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// Email Verification route
router.get("/auth/verify/:token", async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    res.status(400).json("The token is required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tempUser = await TempUser.findOne({ email: decoded.email });

    if (
      !tempUser ||
      tempUser.token !== token ||
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
    next(err);
  }
});

// Register route for depositor or bidder
router.post("/auth/register/user", async (req, res, next) => {
  const { userType, email } = req.body;
  if (!userType || !email) {
    return res.status(400).json({ error: "User type is required" });
  }

  try {
    const tempUser = await TempUser.findOne({
      email,
      isVerified: true,
    });
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
        password: await bcrypt.hash(name + email, 10),
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
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  } catch (err) {
    next(err);
  }
});

// Forget Password
router.post("/auth/forgetPassword", findUserByEmail, async (req, res, next) => {
  const { email } = req.body;
  const user = req.user;

  try {
    if (!user) {
      return res.status(400).json({ error: "email not found" });
    }

    const mailOptions = {
      from: "Desky",
      to: email,
      subject: "Verify Your Email",
      text: "Please click the link to verify your email.",
      html: `<p>Please <a href="http://localhost:3000/en/Forgot-Password/Email-Verification/Reset-Password">click here</a> to verify your email.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to send verification email" });
      }
      res.status(200).json({
        success: "Verification email sent. Please check your inbox.",
      });
    });
  } catch (err) {
    next(err);
  }
});

// Change Password
router.put("/auth/changePassword", findUserByEmail, async (req, res, next) => {
  const { email, password } = req.body;
  const user = req.user;
  try {
    if (!user) {
      return res.status(400).json({ error: "email not found" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (user.role === "depositor") {
      user.depositor_password = hashedPassword;
    } else if (user.role === "bidder") {
      user.bidder_password = hashedPassword;
    } else {
      user.admin_password = hashedPassword;
    }

    await user.save();
    res.status(200).json({
      success: `${password},"Password changed`,
    });
  } catch (err) {
    next(err);
  }
});

// Middleware to handle errors
router.use(handleErrors);

export default router;
