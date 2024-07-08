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
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import Admins from "../mongoose/schemas/Admin.mjs";

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Verifying Bidder's Info
router.put(
  "/admin/bidder/verify/:bidder_id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { bidder_id } = req.params;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const bidder = await Bidders.findById(bidder_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      if (bidder.isTrusted == true) {
        return res.status(400).json({ error: "Bidder already verified" });
      }

      bidder.isTrusted = true;
      await bidder.save();

      const mailOptions = {
        from: "Desky",
        to: bidder.bidder_email,
        subject: "Your Account Status",
        text: `Hello ${bidder.bidder_name}`,
        html: `Your account is verified, Welcome to Desky.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ success: "Bidder verified successfully" });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Refusing Bidder's Info  
router.put(
  "/admin/bidder/refuse/:bidder_id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { message, user_id } = req.body;
    const { bidder_id } = req.params;

    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      const bidder = await Bidders.findById(bidder_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const mailOptions = {
        from: "Desky",
        to: bidder.bidder_email,
        subject: "Your Account Status",
        text: `Hello ${bidder.bidder_name}`,
        html: `Your account is refused, because ${message}.
        Please contact us for more information.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ success: "Bidder refused successfully" });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Verifying Depositor's Info
router.put(
  "/admin/depositor/verify/:depositor_id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { depositor_id } = req.params;

    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const depositor = await Depositors.findById(depositor_id);
      if (!depositor) {
        return res.status(404).json({ error: "depositor not found" });
      }

      if (depositor.isTrusted == true) {
        return res.status(400).json({ error: "depositor already verified" });
      }

      depositor.isTrusted = true;
      await depositor.save();

      const mailOptions = {
        from: "Desky",
        to: depositor.depositor_email,
        subject: "Your Account Status",
        text: `Hello ${depositor.depositor_name}`,
        html: `Your account is verified, Welcome to Desky.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ success: "Depositor verified successfully" });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Refusing Depositor's Info 
router.put(
  "/admin/depositor/refuse/:depositor_id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id, message } = req.body;
    const { depositor_id } = req.params;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const depositor = await Depositors.findById(depositor_id);
      if (!depositor) {
        return res.status(404).json({ error: "depositor not found" });
      }

      const mailOptions = {
        from: "Desky",
        to: depositor.depositor_email,
        subject: "Your Account Status",
        text: `Hello ${depositor.depositor_name}`,
        html: `Your account is refused, because ${message}.
        Please contact us for more information.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(200).json({ success: "Depositor refused successfully" });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Verifying Offer's Info 
router.put(
  "/admin/offer/verify/:offer_id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { offer_id } = req.params;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.status !== "pending") {
        return res.status(400).json({ error: "Offer already verified" });
      }

      const depositor = await Depositors.findById(offer.depositor_id);

      // depositor.depositor_CB += 10;
      offer.status = "open";

      await offer.save();
      await depositor.save();

      const mailOptions = {
        from: "Desky",
        to: depositor.depositor_email,
        subject: "Your Offer Status",
        text: `Hello ${depositor.depositor_name}`,
        html: `Your Offer "${offer.offer_title}" is verified, is now open for bidding.`,
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
  "/admin/offer/refuse/:offer_id",
  checkObjectId,
  checkSessionId,
  async (req, res, next) => {
    const { user_id, message } = req.body;
    const { offer_id } = req.params;
    try {
      const admin = await Admins.findById(user_id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.status == "rejected") {
        return res.status(400).json({ error: "Offer already refused" });
      }

      const depositor = await Depositors.findById(offer.depositor_id);

      offer.status = "rejected";
      await offer.save();

      const mailOptions = {
        from: "Desky",
        to: depositor.depositor_email,
        subject: "Your Offer Status",
        text: `Hello ${depositor.depositor_name}`,
        html: `Your Offer "${offer.offer_title}" is rejected, because ${message}.
        Please contact us for more information.`,
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
      const admin = await Admins.findOne(admin_email);
      if (admin) {
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

// Error handling middleware
router.use(handleErrors);

export default router;
