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
import depositorValidationFields from "../utils/depositorValidationFields.mjs";
import AEValidationFields from "../utils/AEValidationFields.mjs";
import companyValidationFields from "../utils/companyValidationFields.mjs";
import ratingValidationFields from "../utils/ratingValidationFields.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

// Depositor profile info
router.get("/depositor", validateSessionUser, async (req, res, next) => {
  const { id } = req.session.user;

  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    res.status(200).json({ success: depositor });
  } catch (err) {
    next(err);
  }
});

// Depositor info
router.get("/depositor/:id", checkObjectId, async (req, res, next) => {
  const { id } = req.params;

  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    res.status(200).json({ success: depositor });
  } catch (err) {
    next(err);
  }
});

// Depositor AE or Company info

router.get("/depositor/info/:id", checkObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
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

// Depositor edit
router.put(
  "/edit/depositor",
  validateSessionUser,
  depositorValidationFields,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { depositor_name, depositor_email, depositor_password } = req.body;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      if (depositor.depositor_name !== depositor_name) {
        depositor.depositor_name = depositor_name;
      }
      if (depositor.depositor_email !== depositor_email) {
        depositor.depositor_email = depositor_email;
      }
      if (
        bcrypt.compareSync(depositor_password, depositor.depositor_password)
      ) {
        //hash password
        const hashedPassword = await bcrypt.hash(depositor_password, 10);
        depositor.depositor_password = hashedPassword;
      }

      await depositor.save();
      res
        .status(201)
        .json({ success: "Depositor's information updated successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Depositor add AE info
router.post(
  "/add/depositor/AE",
  validateSessionUser,
  AEValidationFields,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { AE_CIN, AE_phoneNumber, AE_DoA, AE_address, AE_location } =
      req.body;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const newAE = new AE({
        _id: id,
        AE_CIN,
        AE_phoneNumber,
        AE_DoA,
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

// Depositor add company info
router.post(
  "/add/depositor/company",
  validateSessionUser,
  companyValidationFields,
  async (req, res, next) => {
    const { id } = req.session.user;
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
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
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
      res
        .status(201)
        .json({ success: "Company information added successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Depositor rate a bidder
router.post(
  "/rate/depositor/:bidder_id/:offer_id",
  validateSessionUser,
  ratingValidationFields,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { rating, text } = req.body;
    const { bidder_id, offer_id } = req.params;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const bidder = await Bidders.findById(bidder_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (
        offer.depositor_id !== id ||
        !offer.bidder_id.includes(bidder_id) ||
        offer.offer_state !== "finished"
      ) {
        return res.status(403).json({ error: "You can't rate this bidder" });
      }

      const newReview = {
        depositor_id: id,
        offer_id,
        rating,
        text,
        date: new Date(),
      };

      bidder.bidder_review.push(newReview);

      await bidder.save();
      res.status(201).json({ success: "Rating added successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Depositor merge account
router.post("/merge/depositor", validateSessionUser, async (req, res, next) => {
  const { id } = req.session.user;
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    if (!depositor.isTrusted) {
      return res.status(403).json({
        error: "Need to fill auto entrepreneur or company information first",
      });
    }

    const bidder = await Bidders.findById(id);
    if (bidder) {
      return res.status(400).json({ error: "This account is already merged" });
    }

    const newBidder = new Bidders({
      _id: id,
      bidder_name: depositor.depositor_name,
      bidder_email: depositor.depositor_email,
      bidder_password: depositor.depositor_password || "",
      bidder_review: [],
      bidder_CB: depositor.depositor_CB,
      isTrusted: true,
      image: depositor.image || {},
      saved_offers: [],
    });

    await newBidder.save();
    res.status(201).json({ success: "Depositor account merged successfully" });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
router.use(handleErrors);

export default router;
