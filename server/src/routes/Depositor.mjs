// Packages
import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

// Middlewares
import { checkObjectId } from "../middlewares/checkObjectId.mjs";
import { checkSessionId } from "../middlewares/checkSessionId.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import depositorValidationFields from "../utils/depositorValidationFields.mjs";
import AEValidationFields from "../utils/AEValidationFields.mjs";
import companyValidationFields from "../utils/companyValidationFields.mjs";
import ratingValidationFields from "../utils/ratingValidationFields.mjs";
import { transporter } from "../utils/emailSend.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Post Depositor's Profile Info
router.post("/depositor", checkSessionId, async (req, res, next) => {
  const { user_id } = req.body;

  try {
    const depositor = await Depositors.findById(user_id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    res.status(200).json({ success: depositor });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Get Depositor's Info
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Get Depositor's AE or Company info
router.get("/depositor/info/:id", checkObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    const ae = await AE.findById(id);
    if (ae) {
      return res.status(200).json({ success: ae });
    }

    const company = await Companies.findById(id);
    if (company) {
      return res.status(200).json({ success: company });
    }

    res.status(404).json({ error: "Depositor info not found" });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Post Depositor's offers
router.post("/depositor/offers", checkSessionId, async (req, res, next) => {
  const { user_id } = req.body;

  try {
    const offers = await Offers.find({ depositor_id: user_id });
    if (!offers) {
      return res.status(404).json({ error: "Offers not found" });
    }

    res.status(200).json({ success: offers });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Edit Depositor's Info
router.put(
  "/edit/depositor",
  checkSessionId,
  depositorValidationFields,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { depositor_name, depositor_email, depositor_password } = req.body;

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      depositor.depositor_name = depositor_name || depositor.depositor_name;

      depositor.depositor_email = depositor_email || depositor.depositor_email;

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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Add Depositor's AE Info
router.post(
  "/add/depositor/AE",
  checkSessionId,
  AEValidationFields,
  async (req, res, next) => {
    const { AE_CIN, AE_phoneNumber, AE_DoA, AE_address, AE_location, user_id } =
      req.body;

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const Company = await Companies.findById(user_id);
      if (Company) {
        return res
          .status(404)
          .json({ error: "Depositor already is a company" });
      }

      const Ae = await AE.findById(user_id);
      if (Ae) {
        return res.status(404).json({ error: "Depositor already is an AE" });
      }

      const newAE = new AE({
        _id: user_id,
        AE_CIN,
        AE_phoneNumber,
        AE_DoA,
        AE_address,
        AE_location,
      });

      await newAE.save();

      const mailOptions = {
        from: "Desky",
        to: depositor.depositor_email,
        subject: "Your Account Status",
        text: `Hello ${depositor.depositor_name}`,
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
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Add Depositor's Company Info
router.post(
  "/add/depositor/company",
  checkSessionId,
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
      user_id,
    } = req.body;

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const Company = await Companies.findById(user_id);
      if (Company) {
        return res
          .status(404)
          .json({ error: "Depositor already is a company" });
      }

      const Ae = await AE.findById(user_id);
      if (Ae) {
        return res.status(404).json({ error: "Depositor already is an AE" });
      }

      const newCompany = new Companies({
        _id: user_id,
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
        to: depositor.depositor_email,
        subject: "Your Account Status",
        text: `Hello ${depositor.depositor_name}`,
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

// Depositor Rates a Bidder
router.post(
  "/rate/depositor/:bidder_id/:offer_id",
  checkSessionId,
  ratingValidationFields,
  checkObjectId,
  async (req, res, next) => {
    const { rating, text, user_id } = req.body;
    const { bidder_id, offer_id } = req.params;

    try {
      const depositor = await Depositors.findById(user_id);
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
        offer.depositor_id !== user_id ||
        !offer.offer_apply.some(
          (application) => application.bidder_id === bidder_id
        ) ||
        offer.offer_state !== "finished"
      ) {
        return res.status(404).json({ error: "You can't rate this bidder" });
      }

      const newReview = {
        depositor_id: user_id,
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Merge Depositor Account
router.post("/merge/depositor", checkSessionId, async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const depositor = await Depositors.findById(user_id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    if (!depositor.isTrusted){
      return res.status(400).json({ error: "This account is not trusted" });
    }

    const bidder = await Bidders.findById(user_id);
    if (bidder) {
      return res.status(400).json({ error: "This account is already merged" });
    }

    const newBidder = new Bidders({
      _id: user_id,
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

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Error handling middleware
router.use(handleErrors);

export default router;
