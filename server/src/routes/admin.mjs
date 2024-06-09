// Packages
import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

// Middlewares
import {
  checkObjectId,
  validateSessionUser,
} from "../middlewares/authMiddleware.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import adminValidationFields from "../utils/adminValidationFields.mjs";

// Schemas
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";

// Bidder verifying
router.put(
  "/admin/bidder/verify/:bidder_id",
  checkObjectId,
  validateSessionUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { bidder_id } = req.params;
    try {
      const admin = await Bidders.findById(id);
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
      res.status(200).json({ success: "Bidder verified successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Bidder refusing
router.put(
  "/admin/bidder/refuse/:bidder_id",
  checkObjectId,
  validateSessionUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { bidder_id } = req.params;

    try {
      const admin = await Bidders.findById(id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      const bidder = await Bidders.findById(bidder_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      bidder.isTrusted = false;

      await bidder.save();
      res.status(200).json({ success: "Bidder refused successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Depositor verifying
router.put(
  "/admin/depositor/verify/:depositor_id",
  checkObjectId,
  validateSessionUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { depositor_id } = req.params;

    try {
      const admin = await Bidders.findById(id);
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
      res.status(200).json({ success: "Depositor verified successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Depositor refusing
router.put(
  "/admin/depositor/refuse/:depositor_id",
  checkObjectId,
  validateSessionUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { depositor_id } = req.params;
    try {
      const admin = await Bidders.findById(id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const depositor = await Depositors.findById(depositor_id);
      if (!depositor) {
        return res.status(404).json({ error: "depositor not found" });
      }
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      res.status(200).json({ success: "Depositor refused successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Offer verifying
router.put(
  "/admin/offer/verify/:offer_id",
  checkObjectId,
  validateSessionUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { offer_id } = req.params;
    try {
      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.status !== "pending") {
        return res.status(400).json({ error: "Offer already verified" });
      }

      const depositor = await Depositors.findById(offer.depositor_id);

      depositor.depositor_CB += 10;
      offer.status = "open";

      await offer.save();
      await depositor.save();
      res.status(200).json({ success: "Offer verified successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Offer refusing
router.put(
  "/admin/offer/refuse/:offer_id",
  checkObjectId,
  validateSessionUser,
  async (req, res, next) => {
    const { id } = req.user;
    const { offer_id } = req.params;
    try {
      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.status !== "pending") {
        return res.status(400).json({ error: "Offer already refused" });
      }

      offer.status = "rejected";

      await offer.save();
      res.status(200).json({ success: "Offer rejected successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Add Admin
router.post(
  "/admin/add",
  validateSessionUser,
  adminValidationFields,
  async (req, res, next) => {
    const { id } = req.user;
    const { admin_name, admin_email, admin_password } = req.body;
    try {
      const admin = await Bidders.findMany(admin_email);
      if (admin) {
        return res.status(400).json({ error: "email already exists" });
      }

      const hashedPassword = bcrypt.hashSync(admin_password, 10);

      const newAdmin = new Bidders({
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

// Error handling middleware
router.use(handleErrors);

export default router;
