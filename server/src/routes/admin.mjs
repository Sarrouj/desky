// Packages
import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

// Middlewares
import { checkObjectId } from "../middlewares/checkObjectId.mjs";
import { checkSessionId } from "../middlewares/checkSessionId.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import adminValidationFields from "../utils/adminValidationFields.mjs";
import { transporter } from "../utils/emailSend.mjs";

// Schemas
import Admins from "../mongoose/schemas/Admin.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Depositors from "../mongoose/schemas/Depositor.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

//Get Unverified Users
router.get("/admin/users", async (req, res, next) => {
  try {
    const [bidders, depositors, aes, companies] = await Promise.all([
      Bidders.find({ isTrusted: false }),
      Depositors.find({ isTrusted: false }),
      AE.find({}),
      Companies.find({}),
    ]);

    const aeMap = new Map(aes.map((ae) => [ae._id.toString(), ae]));
    const companyMap = new Map(
      companies.map((company) => [company._id.toString(), company])
    );

    const unverifiedAE = bidders
      .filter((bidder) => aeMap.has(bidder._id.toString()))
      .map((bidder) => ({
        ...bidder.toObject(),
        aeInfo: aeMap.get(bidder._id.toString()),
        userType: "bidder",
      }))
      .concat(
        depositors
          .filter((depositor) => aeMap.has(depositor._id.toString()))
          .map((depositor) => ({
            ...depositor.toObject(),
            aeInfo: aeMap.get(depositor._id.toString()),
            userType: "depositor",
          }))
      );

    const unverifiedCompany = bidders
      .filter((bidder) => companyMap.has(bidder._id.toString()))
      .map((bidder) => ({
        ...bidder.toObject(),
        companyInfo: companyMap.get(bidder._id.toString()),
        userType: "bidder",
      }))
      .concat(
        depositors
          .filter((depositor) => companyMap.has(depositor._id.toString()))
          .map((depositor) => ({
            ...depositor.toObject(),
            companyInfo: companyMap.get(depositor._id.toString()),
            userType: "depositor",
          }))
      );

    res.status(200).json({
      success: true,
      data: {
        unverifiedAE,
        unverifiedCompany,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching unverified users.",
      error: err.message,
    });
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Verify User
router.put(
  "/admin/verify/:type/:id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { type, id } = req.params;

    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      let user;
      if (type === "bidder") {
        user = await Bidders.findById(id);
      } else if (type === "depositor") {
        user = await Depositors.findById(id);
      }

      if (!user) {
        return res.status(404).json({
          error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
        });
      }

      if (user.isTrusted) {
        return res.status(400).json({
          error: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } already verified`,
        });
      }

      user.isTrusted = true;
      await user.save();

      const mailOptions = {
        from: "Desky",
        to: user[type + "_email"],
        subject: ": Welcome to Desky – We’re Excited to Have You!",
        text: `Welcome to Desky`,
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
        <h3>Hello ${user[type + "_name"]}</h3>
        <h4>Your account been verified successfully</h4>
        <p>We’re thrilled to have you with us and can’t wait to see what you’ll
          accomplish on Desky. If you have any questions or feedback, don’t
          hesitate to reach out.</p>
          <p>To get started, simply log in to your account:</p>
        <div>
          <a href="http://localhost:3000/en/Login"> Login </a>
        </div>
        <h5>
          Welcome aboard! <br />
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
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({
          success: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } verified successfully`,
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Refusing User
router.put(
  "/admin/refuse/:type/:id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id, message } = req.body;
    const { type, id } = req.params;

    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      let user;
      if (type === "bidder") {
        user = await Bidders.findById(id);
      } else if (type === "depositor") {
        user = await Depositors.findById(id);
      }

      if (!user) {
        return res.status(404).json({
          error: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`,
        });
      }

      const mailOptions = {
        from: "Desky",
        to: user[type + "_email"],
        subject: "Your Account Status",
        text: `Hello ${user[type + "_name"]}`,
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
        <h3>Account Application Status Update – Desky</h3>
        <h4>Hello ${user[type + "_name"]}</h4>
        <p>Thank you for your interest in joining Desky</p>
        <p>
          After carefully reviewing your Account, we regret to inform you that we
          are unable to approve your account at this time. This decision was
          made based on ${message}.
        </p>
        <p>please fell free to contact owr team for more information.</p>
        <h5>Desky Team</h5>
      </div>
      <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
    </div>
  </body>
</html>
`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({
          success: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } refused successfully`,
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Verifying Offer's Info
router.put(
  "/admin/offer/verify/:id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.offer_state !== "pending") {
        return res.status(400).json({ error: "Offer already verified" });
      }

      const depositor = await Depositors.findById(offer.depositor_id);

      // depositor.depositor_CB += 10;
      offer.offer_state = "open";

      await offer.save();
      // await depositor.save();

      const mailOptions = {
        from: "Desky",
        to: user[type + "_email"],
        subject: "Your Offer is Verified!",
        text: `Your Offer "${offer.offer_title}" is verified`,
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
        <h3>Hello ${depositor.depositor_name}</h3>
        <p>
          Your Offer "${offer.offer_title}" is verified, and open for bidding.
        </p>
        <h5>
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
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ success: "Offer verified successfully" });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Refusing Offer's Info
router.put(
  "/admin/offer/refuse/:id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const { id } = req.params;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.offer_state == "rejected") {
        return res.status(400).json({ error: "Offer already refused" });
      }

      const depositor = await Depositors.findById(offer.depositor_id);

      offer.offer_state = "rejected";
      await offer.save();

      const mailOptions = {
        from: "Desky",
        to: depositor.depositor_email,
        subject: "Your Account Status",
        text: `Your account been rejected`,
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
        <h3>Offer Status Update – Desky</h3>
        <h4>Hello ${depositor.depositor_name}</h4>
        <p>
          After carefully reviewing your offer "${offer.offer_title}", we regret to inform you that we
          are unable to approve your offer at this time. This decision was
          made based on ${message}.
        </p>
        <p>please fell free to contact our team for more information.</p>
        <h5>Desky Team</h5>
      </div>
      <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
    </div>
  </body>
</html>
`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ success: "Offer rejected successfully" });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Add Admin
router.post(
  "/admin/add",
  checkSessionId,
  adminValidationFields,
  async (req, res, next) => {
    const { admin_name, admin_email, admin_password, user_id } = req.body;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const existingAdmin = await Admins.findOne(admin_email);
      if (existingAdmin) {
        return res.status(400).json({ error: "email already exists" });
      }

      const hashedPassword = bcrypt.hashSync(admin_password, 10);

      const newAdmin = new Admins({
        admin_name,
        admin_email,
        admin_password: hashedPassword,
      });

      newAdmin.save();
      res.status(201).json({ success: "Admin added successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// User Send Email to Admin
router.post("/user/send-email", async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const mailOptions = {
      from: name,
      to: "fahd.suirita123@gmail.com",
      subject: "User Message",
      text: `User Message`,
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
        <h4>Hello Admin</h4>
        <p>
         ${message}.
        </p>
      </div>
      <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
    </div>
  </body>
</html>
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send email" });
      }
      res.status(200).json({
        success: "email sent successfully",
      });
    });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Error handling middleware
router.use(handleErrors);

export default router;
