// Packages
import express from "express";
const router = express.Router();

// Middlewares
import {
  checkObjectId,
  validateSessionUser,
} from "../middlewares/authMiddleware.mjs";
import { handleErrors } from "../middlewares/errorMiddleware.mjs";
import offerValidationFields from "../utils/offerValidationFields.mjs";
import offerStateValidationFields from "../utils/offerStateValidationFields.mjs";

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";

// All Offers
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

// Offer's info
router.get("/offer/:id", checkObjectId, async (req, res, next) => {
  try {
    const offer = await Offers.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json({ success: offer });
  } catch (err) {
    next(err);
  }
});

// Offer search
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

// Add Offer
router.post(
  "/add/offer",
  validateSessionUser,
  offerValidationFields,
  async (req, res, next) => {
    const { id } = req.session.user;
    const {
      offer_title,
      offer_description,
      offer_category,
      offer_location,
      offer_deadLine,
      offer_budget,
      offer_attachments,
    } = req.body;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const newOffer = new Offers({
        offer_title,
        offer_description,
        offer_category,
        offer_DoP: new Date(),
        offer_location,
        offer_deadLine,
        offer_budget,
        offer_attachments,
        depositor_id: id,
        bidder_id: [],
        offer_state: "pending",
      });

      await newOffer.save();
      res.status(201).json({ success: "Offer created successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Offer edit
router.put(
  "/edit/offer/:offer_id",
  validateSessionUser,
  offerValidationFields,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const {
      offer_title,
      offer_description,
      offer_category,
      offer_location,
      offer_deadLine,
      offer_budget,
      offer_attachments,
    } = req.body;
    const { offer_id } = req.params;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.depositor_id.toString() !== id || offer.bidder_id.length > 0) {
        return res.status(403).json({ error: "You can't edit this offer" });
      }

      if (offer.offer_title !== offer_title) {
        offer.offer_title = offer_title;
      }
      if (offer.offer_description !== offer_description) {
        offer.offer_description = offer_description;
      }
      if (!offer.offer_category.includes(offer_category)) {
        offer.offer_category = offer_category;
      }
      offer.offer_DoP = new Date();
      if (offer.offer_location !== offer_location) {
        offer.offer_location = offer_location;
      }
      if (offer.offer_deadLine !== offer_deadLine) {
        offer.offer_deadLine = offer_deadLine;
      }
      if (offer.offer_budget !== offer_budget) {
        offer.offer_budget = offer_budget;
      }
      if (!offer.offer_attachments.includes(offer_attachments)) {
        offer.offer_attachments = offer_attachments;
      }
      if (offer.offer_state !== "pending") {
        offer.offer_state = "pending";
      }

      await offer.save();
      res.status(200).json({ success: "Offer edited successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Offer state edit
router.put(
  "/edit/offer/state/:offer_id",
  validateSessionUser,
  offerStateValidationFields,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { offer_state } = req.body;
    const { offer_id } = req.params;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.depositor_id.toString() !== id) {
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

// Offer delete
router.delete(
  "/delete/offer/:offer_id",
  validateSessionUser,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { offer_id } = req.params;

    try {
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.depositor_id.toString() !== id) {
        return res.status(403).json({ error: "You can't delete this offer" });
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

      await offer.deleteOne();
      res.status(200).json({ success: "Offer deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Offer save
router.post(
  "/save/offer/:offer_id",
  validateSessionUser,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { offer_id } = req.params;

    try {
      const bidder = await Bidders.findById(id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      if (!bidder.isTrusted) {
        return res.status(403).json({ error: "You can't save offers" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (
        bidder.saved_offers.some(
          (savedOffer) => savedOffer.offer_id === offer_id
        )
      ) {
        return res.status(403).json({ error: "You already saved this offer" });
      }

      const savedOffers = {
        offer_id,
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

// Offer unsave
router.delete(
  "/unsave/offer/:offer_id",
  validateSessionUser,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { offer_id } = req.params;

    try {
      const bidder = await Bidders.findById(id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const offer = await Offers.findById(offer_id);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      const savedIndex = bidder.saved_offers.findIndex(
        (savedOffer) => savedOffer.offer_id === offer_id
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

// Offer apply
router.post(
  "/apply/offer/:offerId",
  validateSessionUser,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { offerId } = req.params;

    try {
      const bidder = await Bidders.findById(id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      if (!bidder.isTrusted) {
        return res.status(403).json({ error: "You can't apply to this offer" });
      }

      if (bidder.bidder_CB < 10) {
        return res
          .status(403)
          .json({ error: "You don't have enough Connects" });
      }

      const offer = await Offers.findById(offerId);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      if (offer.bidder_id.includes(id)) {
        return res
          .status(403)
          .json({ error: "You already applied for this offer" });
      }

      bidder.bidder_CB -= 10;
      await bidder.save();

      offer.bidder_id.push(id);
      await offer.save();
      res.status(200).json({ success: "Offer applied successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Delete offer apply
router.delete(
  "/delete/apply/offer/:offerId",
  validateSessionUser,
  checkObjectId,
  async (req, res, next) => {
    const { id } = req.session.user;
    const { offerId } = req.params;

    try {
      const bidder = await Bidders.findById(id);
      if (!bidder) {
        return res.status(404).json({ error: "Bidder not found" });
      }

      const offer = await Offers.findById(offerId);
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }

      const index = offer.bidder_id.findIndex((bidderId) => bidderId === id);
      if (index === -1) {
        return res
          .status(404)
          .json({ error: "You haven't applied to this offer" });
      }

      bidder.bidder_CB += 10;

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

      offer.bidder_id.splice(index, 1);
      await offer.save();
      res.status(200).json({ success: "Apply removed successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// Error handling middleware
router.use(handleErrors);

export default router;
