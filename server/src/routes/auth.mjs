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

// env Local
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const URL = process.env.URL;

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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
        from: "Desky <your-email@example.com>",
        to: email,
        subject: "Email Verification",
        text: "Please verify your email.",
        html: `
        <!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        width: 94%;
        background-color: #f1f1f1;
        border-radius: 5px;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .email-header {
        background-color: rgb(234, 117, 39);
        width: 50%;
        margin: auto;
        border-radius: 5px 5px 0 0;
        text-align: center;
        padding: 20px;
      }
      .email-header h2 {
        margin: 0;
        color: #ffffff;
      }
      .email-body {
        background-color: #ffffff;
        width: 50%;
        margin: auto;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .email-body h3 {
        color: #000000;
      }
      .email-body p {
        color: #000000;
        padding: 0 20px;
      }
      .email-body div {
        text-align: center;
        margin-top: 20px;
      }
      .email-body a {
        background-color: rgb(234, 117, 39);
        color: #e9e9e9;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
      }
      .email-body a:hover {
        background-color: rgb(223, 125, 59);
      }
      .email-footer {
        text-align: center;
        color: #686868;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h2>Desky</h2>
      </div>
      <div class="email-body">
        <h3>Hello ${name}</h3>
        <p>
          Thank you for signing up with Desky! To complete your registration,
          please verify your email address by clicking the link below:
        </p>
        <div>
          <a
            href="${URL}/en/sign-up/verify-email/verified?token=${token}"
          >
            Confirm Your Email
          </a>
        </div>
        <h5>Thank you, <br /> Desky Team</h5>
      </div>
      <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
    </div>
  </body>
</html>
  `,
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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
      html: `<!DOCTYPE html>
<html>
  <head>
    <style>
      .email-container {
        width: 94%;
        background-color: #f1f1f1;
        border-radius: 5px;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      .email-header {
        background-color: rgb(234, 117, 39);
        width: 50%;
        margin: auto;
        border-radius: 5px 5px 0 0;
        text-align: center;
        padding: 20px;
      }
      .email-header h2 {
        margin: 0;
        color: #ffffff;
      }
      .email-body {
        background-color: #ffffff;
        width: 50%;
        margin: auto;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .email-body h3 {
        color: #000000;
      }
      .email-body p {
        color: #000000;
        padding: 0 20px;
      }
      .email-body div {
        text-align: center;
        margin-top: 20px;
      }
      .email-body a {
        background-color: rgb(234, 117, 39);
        color: #e9e9e9;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
      }
      .email-body a:hover {
        background-color: rgb(223, 125, 59);
      }
      .email-footer {
        text-align: center;
        color: #686868;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h2>Desky</h2>
      </div>
      <div class="email-body">
        <p>
          We received a request to reset your password for your Desky account.
          To reset your password, click the link below:
        </p>
        <div>
          <a
            href="${URL}/en/forgot-password/email-verification/reset-password"
          >
            Reset Your Password
          </a>
        </div>
        <h5>
          Thank you, <br />
          Desky Team
        </h5>
      </div>
      <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
    </div>
  </body>
</html>
`,
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

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
