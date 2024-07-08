// Packages
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config({ path: ".env.local" });

// Middlewares
import { checkObjectId } from "../middlewares/checkObjectId.mjs";
import { checkSessionId } from "../middlewares/checkSessionId.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import bidderValidationFields from "../utils/bidderValidationFields.mjs";
import companyValidationFields from "../utils/companyValidationFields.mjs";
import ratingValidationFields from "../utils/ratingValidationFields.mjs";
import { transporter } from "../utils/emailSend.mjs";
import upload from "../utils/upload.mjs";

// Schemas
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Post Bidder's Profile Info
router.post("/bidder", checkSessionId, async (req, res, next) => {
  const { user_id } = req.body;

  try {
    const bidder = await Bidders.findById(user_id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    res.status(200).json({ success: bidder });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Get Bidder's info
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Get Bidder AE or Company Info
router.get("/bidder/info/:id", checkObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    const ae = await AE.findById(id);
    if (ae) {
      return res.status(200).json({ success: ae });
    }

    const company = await Companies.findById(id);
    if (company) {
      return res.status(200).json({ success: company });
    }

    res.status(404).json({ error: "Bidder info not found" });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Edit bidder's Info
router.put(
  "/edit/bidder",
  checkSessionId,
  bidderValidationFields,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { bidder_name, bidder_email, bidder_password } = req.body;

    try {
      const bidder = await Bidders.findById(user_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      bidder.bidder_name = bidder_name || bidder.bidder_name;
      bidder.bidder_email = bidder_email || bidder.bidder_email;
      if (!bcrypt.compareSync(bidder_password, bidder.bidder_password)) {
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Add Bidder's AE Info
router.post("/add/bidder/AE", upload.single("AE_CIN"), async (req, res, next) => {
  const { email, AE_phoneNumber, AE_DoA, AE_address, AE_location } = req.body;
  if (!email || !AE_phoneNumber || !AE_DoA || !AE_address || !AE_location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const AE_CIN = req.file.filename;
  if (!AE_CIN) {
    return res.status(400).json({ error: "AE CIN is required" });
  }

  try {
    const bidder = await Bidders.findOne({ bidder_email: email });
    if (!bidder) {
      return res.status(404).json({ error: "No bidders found" });
    }

    await AE.create({
      _id: bidder.id,
      AE_CIN,
      AE_phoneNumber,
      AE_DoA,
      AE_address,
      AE_location,
    });

    const mailOptions = {
      from: "Desky",
      to: email,
      subject: "Your Account Status",
      text: `Hello ${bidder.bidder_name}`,
      html: `Your account need to be verified by the admin, it will take 24 hours to be verified,
      thank you for your patience.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send email" });
      }
      res.status(201).json({
        success: "Auto entrepreneur information added successfully",
      });
    });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Add Bidder's Company Info
router.post(
  "/add/bidder/company",
  companyValidationFields,
  async (req, res, next) => {
    const {
      email,
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
      const bidder = await Bidders.findOne({ bidder_email: email });
      if (!bidder) {
        return res.status(404).json({ error: "No bidders found" });
      }

      const newCompany = new Companies({
        _id: bidder.id,
        company_type,
        company_name,
        company_phoneNumber,
        company_address,
        company_location,
        company_CR,
        company_DoA,
        company_size,
      });

      await newCompany.save();

      const mailOptions = {
        from: "Desky",
        to: email,
        subject: "Your Account Status",
        text: `Hello ${bidder.bidder_name}`,
        html: `Your account need to be verified by the admin, it will take 24 hours to be verified,
        thank you for your patience.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email" });
        }
        res.status(201).json({
          success: "Company information added successfully",
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Bidder Rates a Depositor
router.post(
  "/rate/bidder/:depositor_id/:offer_id",
  checkSessionId,
  ratingValidationFields,
  checkObjectId,
  async (req, res, next) => {
    const { rating, text, user_id } = req.body;
    const { depositor_id, offer_id } = req.params;

    try {
      const bidder = await Bidders.findById(user_id);
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
        offer.bidder_id.includes(user_id) &&
        offer.offer_state !== "finished"
      ) {
        return res.status(404).json({ error: "You can't rate this depositor" });
      }

      const newReview = {
        bidder_id: user_id,
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Merge Bidder Account
router.post("/merge/bidder", checkSessionId, async (req, res, next) => {
  const { user_id } = req.body;

  try {
    const bidder = await Bidders.findById(user_id);
    if (!bidder) {
      return res.status(404).json({ error: "bidder not found" });
    }

    const depositor = await Depositors.findById(user_id);
    if (depositor) {
      return res.status(401).json({
        error: "this account is already merged",
      });
    }

    const newDepositor = new Depositors({
      _id: user_id,
      depositor_name: bidder.bidder_name,
      depositor_email: bidder.bidder_email,
      depositor_password: bidder.bidder_password || "",
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Error handling middleware
router.use(handleErrors);

export default router;
