// Packages
import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Middlewares
import { checkObjectId } from "../middlewares/checkObjectId.mjs";
import { checkSessionId } from "../middlewares/checkSessionId.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import offerStateValidationFields from "../utils/offerStateValidationFields.mjs";
import { transporter } from "../utils/emailSend.mjs";
import upload from "../utils/upload.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Get All The Offers
router.get("/offers", async (req, res, next) => {
  try {
    const offers = await Offers.find();
    if (offers.length === 0) {
      return res.status(404).json({ error: "No offers found" });
    }
    res.status(200).json({ success: offers });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Get Offer's Info
router.get("/offer/:id", checkObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const offer = await Offers.findById(id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    res.status(200).json({ success: offer });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Search And Filter Offers
router.get("/search/offer", async (req, res, next) => {
  const { search, category, location } = req.query;
  try {
    let query = {};
    if (search) {
      query.$or = [
        { offer_title: { $regex: search, $options: "i" } },
        { offer_description: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      query.offer_category = category;
    }
    if (location) {
      query.offer_location = { $regex: location, $options: "i" };
    }
    const offers = await Offers.find(query);
    if (offers.length === 0) {
      return res.status(404).json({ error: "No offers found" });
    }
    res.status(200).json({ success: offers });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Add An Offer
router.post(
  "/add/offer",
  upload.single("offer_attachment"),
  async (req, res, next) => {
    const {
      offer_title,
      offer_description,
      offer_location,
      offer_deadline,
      offer_budget,
      user_id,
    } = req.body;
    let offer_category;

    try {
      offer_category = JSON.parse(req.body.offer_category);
    } catch (error) {
      return res.status(400).json({ error: "Invalid offer category format" });
    }

    if (
      !offer_title ||
      !offer_description ||
      !offer_category ||
      !offer_location ||
      !offer_deadline ||
      !offer_budget ||
      !user_id
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer_attachment = req.file ? req.file.filename : "";

      await Offers.create({
        offer_title,
        offer_description,
        offer_category,
        offer_location,
        offer_deadline,
        offer_budget,
        offer_attachment,
        depositor_id: user_id,
      });

      const email = process.env.EMAIL_USER;

      const mailOptions = {
        from: "Desky",
        to: email,
        subject: "New Offer Notification",
        text: `Hello Admin`,
        html: `<!DOCTYPE html>
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
           There is a new offer from ${depositor.depositor_name} to be verified
          </p>
        </div>
        <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
      </div>
    </body>
  </html>
  `,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Failed to send email:", error);
          return res.status(500).json({ error: "Failed to send email" });
        }

        // Respond with success after the email is sent successfully
        res.status(201).json({
          success: "A New Offer has been added and email sent successfully",
        });
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Edit an Offer
router.put(
  "/edit/offer/:id",
  checkObjectId,
  upload.single("offer_attachment"),
  async (req, res, next) => {
    const {
      offer_title,
      offer_description,
      offer_category,
      offer_location,
      offer_deadline,
      offer_budget,
      user_id,
    } = req.body;
    const { id } = req.params;

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (
        offer.depositor_id.toString() !== user_id ||
        offer.offer_apply.length > 0 ||
        offer.offer_state !== "open"
      ) {
        return res.status(403).json({ error: "You can't edit this offer" });
      }

      offer.offer_title = offer_title || offer.offer_title;
      offer.offer_description = offer_description || offer.offer_description;
      offer.offer_category = offer_category || offer.offer_category;
      offer.offer_location = offer_location || offer.offer_location;
      offer.offer_deadline = offer_deadline || offer.offer_deadline;
      offer.offer_budget = offer_budget || offer.offer_budget;

      if (req.file) {
        offer.offer_attachment = req.file.filename;
      }

      await offer.save();
      res.status(200).json({ success: "Offer edited successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Edit Offer's State
router.put(
  "/edit/offer/state/:id",
  offerStateValidationFields,
  checkSessionId,
  checkObjectId,
  async (req, res, next) => {
    const { offer_state, user_id } = req.body;
    const { id } = req.params;

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (
        offer.depositor_id.toString() !== user_id ||
        offer.offer_state === "finished"
      ) {
        return res.status(403).json({ error: "You can't edit this offer" });
      }

      offer.offer_state = offer_state;

      await offer.save();
      res.status(200).json({ success: "Offer state edited successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Delete an Offer
router.delete(
  "/delete/offer/:id",
  checkSessionId,
  checkObjectId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;

    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (
        offer.depositor_id.toString() !== user_id ||
        (offer.offer_state !== "pending" && offer.offer_state !== "open") ||
        offer.offer_apply.length > 0
      ) {
        return res.status(403).json({ error: "You can't delete this offer" });
      }

      await offer.deleteOne();
      res.status(200).json({ success: "Offer deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Save an Offer
router.post(
  "/save/offer/:id",
  checkSessionId,
  checkObjectId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;

    try {
      const bidder = await Bidders.findById(user_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      if (!bidder.isTrusted) {
        return res.status(403).json({ error: "You can't save offers" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (
        bidder.saved_offers.some(
          (savedOffer) => savedOffer.offer_id.toString() === id
        )
      ) {
        return res.status(403).json({ error: "You already saved this offer" });
      }

      const savedOffers = {
        offer_id: id,
        date: new Date(),
      };

      bidder.saved_offers.push(savedOffers);
      await bidder.save();

      res.status(200).json({ success: "Offer saved successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Unsave an Offer
router.delete(
  "/unsave/offer/:id",
  checkSessionId,
  checkObjectId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;

    try {
      const bidder = await Bidders.findById(user_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const savedIndex = bidder.saved_offers.findIndex(
        (savedOffer) => savedOffer.offer_id === id
      );
      if (savedIndex === -1) {
        return res.status(403).json({ error: "You haven't saved this offer" });
      }

      bidder.saved_offers.splice(savedIndex, 1);
      await bidder.save();
      res.status(200).json({ success: "Offer unsaved successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Apply to an Offer
router.post(
  "/apply/offer/:id",
  checkObjectId,
  upload.single("estimate"),
  async (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;

    try {
      const bidder = await Bidders.findById(user_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.depositor_id.toString() === user_id) {
        return res
          .status(403)
          .json({ error: "You can't apply to your own offers" });
      }

      if (!bidder.isTrusted) {
        return res
          .status(403)
          .json({ error: "You need to be trusted to apply to this offer" });
      }

      // if (bidder.bidder_CB < 10) {
      //   return res
      //     .status(403)
      //     .json({ error: "You don't have enough Connects" });
      // }

      if (offer.offer_apply.some((apply) => apply.bidder_id === user_id)) {
        return res
          .status(403)
          .json({ error: "You already applied for this offer" });
      }

      // bidder.bidder_CB -= 10;
      // await bidder.save();

      const estimate = req.file ? req.file.filename : "";
      const date = new Date();

      const newOfferApply = { bidder_id: user_id, estimate, date };
      offer.offer_apply.push(newOfferApply);
      await offer.save();
      res.status(200).json({ success: "Offer applied successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Delete an Apply to an Offer
router.delete(
  "/delete/apply/offer/:id",
  checkSessionId,
  checkObjectId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { id } = req.params;

    try {
      const bidder = await Bidders.findById(user_id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const offer = await Offers.findById(id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      const index = offer.offer_apply.findIndex(
        (apply) => apply.bidder_id === user_id
      );
      if (index === -1) {
        return res
          .status(404)
          .json({ error: "You haven't applied to this offer" });
      }

      // Refund the connect cost
      bidder.bidder_CB += 10;
      await bidder.save();

      // Remove the application from the offer
      offer.offer_apply.splice(index, 1);
      await offer.save();

      res.status(200).json({ success: "Apply removed successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Handle errors
router.use(handleErrors);

export default router;
