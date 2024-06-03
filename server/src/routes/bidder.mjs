// Packages
import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { GridFSBucket } from "mongodb";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Middlewares
import {
  checkObjectId,
  validateSessionUser,
} from "../middlewares/authMiddleware.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import bidderValidationFields from "../utils/bidderValidationFields.mjs";
import AEValidationFields from "../utils/AEValidationFields.mjs";
import companyValidationFields from "../utils/companyValidationFields.mjs";
import ratingValidationFields from "../utils/ratingValidationFields.mjs";

// Schemas
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

const router = express.Router();
const conn = mongoose.connection;

let gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

const storage = new GridFsStorage({
  url: process.env.database_connection,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// Bidder profile info
router.get("/bidder", validateSessionUser, async (req, res, next) => {
  const { id } = req.session.user;

  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    res.status(200).json({ success: bidder });
  } catch (err) {
    next(err);
  }
});

// Bidder info
router.get("/bidder/:id", checkObjectId, async (req, res, next) => {
  const id = req.params.id;

  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    res.status(200).json({ success: bidder });
  } catch (err) {
    next(err);
  }
});

// Bidder AE or Company info
router.get("/bidder/info/:id", checkObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    const ae = await AE.findById(id);
    if (ae) {
      return res.status(404).json({ success: ae });
    }

    const company = await Companies.findById(id);
    if (company) {
      return res.status(404).json({ success: company });
    }
  } catch (err) {
    next(err);
  }
});

// bidder edit
router.put(
  "/edit/bidder",
  validateSessionUser,
  bidderValidationFields,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { bidder_name, bidder_email, bidder_password } = req.body;

    try {
      const bidder = await Bidders.findById(id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      if (bidder.bidder_name !== bidder_name) {
        bidder.bidder_name = bidder_name;
      }
      if (bidder.bidder_email !== bidder_email) {
        bidder.bidder_email = bidder_email;
      }
      if (!bcrypt.compareSync(bidder_password, bidder.bidder_password)) {
        // Hash password
        const hashedPassword = await bcrypt.hash(bidder_password, 10);
        bidder.bidder_password = hashedPassword;
      }

      await bidder.save();
      res
        .status(201)
        .json({ success: "Bidder's information updated successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Bidder add AE info
router.post(
  "/add/bidder/AE",
  AEValidationFields,
  upload.single("AE_CIN"),
  async (req, res, next) => {
    const { AE_phoneNumber, AE_DoA, AE_address, AE_location } = req.body;

    try {
      const lastBidder = await Bidders.findOne().sort({ _id: -1 });
      if (!lastBidder) {
        return res.status(404).json({ error: "No bidders found" });
      }

      const newAE = new AE({
        _id: lastBidder._id,
        AE_CIN: {
          file_id: req.file.id,
          file_name: req.file.filename,
          file_size: req.file.size,
          upload_date: req.file.uploadDate,
        },
        AE_phoneNumber,
        AE_DoA: JSON.parse(AE_DoA),
        AE_address,
        AE_location,
      });

      await newAE.save();
      res
        .status(201)
        .json({ success: "Auto entrepreneur information added successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Bidder add company info
router.post(
  "/add/bidder/company",
  companyValidationFields,
  async (req, res, next) => {
    const {
      company_type,
      company_name,
      company_phoneNumber,
      company_address,
      company_location,
      company_CR,
      company_DoA,
      company_size,
    } = req.body;

    try {
      const lastBidder = await Bidders.findOne().sort({ _id: -1 });
      if (!lastBidder) {
        return res.status(404).json({ error: "No bidders found" });
      }

      const newCompany = new Companies({
        _id: id,
        company_name,
        company_phoneNumber,
        company_address,
        company_location,
        company_CR,
        company_DoA,
        company_size,
      });

      await newCompany.save();
      res.status(201).json({
        success: "company information added successfully",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Bidder rate a depositor
router.post(
  "/rate/bidder/:depositor_id/:offer_id",
  validateSessionUser,
  ratingValidationFields,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { rating, text } = req.body;
    const { depositor_id, offer_id } = req.params;

    try {
      const bidder = await Bidders.findById(id);
      if (!bidder) {
        return res.status(404).json({ error: "bidder not found" });
      }

      const depositor = await Depositors.findById(depositor_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "offer not found" });
      }

      if (
        offer.depositor_id !== depositor_id &&
        offer.bidder_id.includes(id) &&
        offer.offer_state !== "finished"
      ) {
        return res.status(404).json({ error: "you cant rate this bidder" });
      }

      const newReview = {
        bidder_id: id,
        offer_id,
        rating,
        text,
        date: new Date(),
      };

      depositor.depositor_review.push(newReview);

      await depositor.save();
      res.status(201).json({
        success: "rating added successfully",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Bidder merge account
router.post("/merge/bidder", validateSessionUser, async (req, res, next) => {
  const { id } = req.session.user;

  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "bidder not found" });
    }

    const depositor = await Depositors.findById(id);
    if (depositor) {
      return res.status(401).json({
        error: "this account is already merged",
      });
    }

    const newDepositor = new Depositors({
      _id: id,
      depositor_name: bidder.bidder_name,
      depositor_email: bidder.bidder_email,
      depositor_password: depositor.depositor_password || "",
      depositor_reviewers: [],
      depositor_CB: bidder.bidder_CB,
      isTrusted: true,
      image: bidder.image || {},
    });

    await newDepositor.save();
    res.status(201).json({
      success: "bidder account merged successfully",
    });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
router.use(handleErrors);

export default router;
