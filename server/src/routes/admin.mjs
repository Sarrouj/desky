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
        subject: "Your Account Status",
        text: `Hello ${user[type + "_name"]}`,
        html: `Your account is verified, Welcome to Desky.`,
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
        html: `Your account is refused because ${message}. Please contact us for more information.`,
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

      if (offer.status !== "pending") {
        return res.status(400).json({ error: "Offer already verified" });
      }

      const depositor = await Depositors.findById(offer.depositor_id);

      // depositor.depositor_CB += 10;
      offer.status = "open";

      await offer.save();
      // await depositor.save();

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

// Error handling middleware
router.use(handleErrors);

export default router;
