// Packages
import express from "express";
const router = express.Router();

// Schemas
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";

// all Offers
router.get("/offers", async (req, res) => {
  try {
    const offers = await Offers.find();
    res.status(200).json(offers);
  } catch (err) {
    console.error("Error during getting the offers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer's info
router.get("/offer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await Offers.findById(id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(offer);
  } catch (err) {
    console.error("Error during getting offer's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer search
router.get("/search/offer/:search/:category", async (req, res) => {
  const { search, category } = req.params;
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

    const offers = await Offers.find(query);

    if (offers.length === 0) {
      return res.status(404).json({ error: "No offers found" });
    }

    res.status(200).json(offers);
  } catch (err) {
    console.error("Error during searching for the offers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add Offer
router.post("/add/offer", async (req, res) => {
  const { id } = req.session;

  const {
    offer_title,
    offer_description,
    offer_category,
    offer_location,
    offer_deadLine,
    offer_budget,
    offer_attachments,
  } = req.body;
  if (
    !offer_title ||
    !offer_description ||
    !offer_category ||
    !offer_location ||
    !offer_deadLine ||
    !offer_budget ||
    !offer_attachments
  ) {
    return res.status(400).json({ error: "all fields are required" });
  }

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
    });

    newOffer.save();
    res.status(201).json({ success: "offer created successfully" });
  } catch (err) {
    console.error("Error during offer creation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer edit
router.put("/edit/offer/:offer_id", async (req, res) => {
  const { id } = req.session;

  const { offer_id } = req.params;

  const {
    offer_title,
    offer_description,
    offer_category,
    offer_location,
    offer_deadLine,
    offer_budget,
    offer_attachments,
  } = req.body;
  if (
    !offer_title ||
    !offer_description ||
    !offer_category ||
    !offer_location ||
    !offer_deadLine ||
    !offer_budget ||
    !offer_attachments
  ) {
    return res.status(400).json({ error: "all fields are required" });
  }
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    const offer = await Offers.findById(offer_id);
    if (!offer) {
      return res.status(404).json({ error: "offer not found" });
    }

    if (offer.depositor_id !== id || offer.bidder_id.length > 0) {
      return res.status(403).json({ error: "You can't edit this offer" });
    }

    if (offer.offer_title !== offer_title) {
      offer.offer_title = offer_title;
    }
    if (offer.offer_description !== offer_description) {
      offer.offer_description = offer_description;
    }
    if (!offer.offer_category.include(offer_category)) {
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
    if (!offer.offer_attachments.include(offer_attachments)) {
      offer.offer_attachments = offer_attachments;
    }

    await offer.save();
    res.status(201).json({ success: "offer edited successfully" });
  } catch (err) {
    console.error("Error during offer edit:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer delete
router.post("/delete/offer/:offer_id", async (req, res) => {
  const { id } = req.session;
  const { offer_id } = req.params;
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    const offer = await Offers.findById(offer_id);
    if (!offer) {
      return res.status(404).json({ error: "offer not found" });
    }

    if (offer.depositor_id !== id) {
      return res.status(403).json({ error: "You can't delete this offer" });
    }

    offer.deleteOne();
    res.status(200).json({ error: "offer deleted successfully" });
  } catch (err) {
    console.error("Error during offer deletion:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer save
router.get("/save/offer/:offer_id", async (req, res) => {
  const { offer_id } = req.params;
  const { id } = req.session;
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    if (bidder.isTrusted == false) {
      return res.status(403).json({ error: "You can't save offers" });
    }

    const offer = await Offers.findById(offer_id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (
      bidder.saved_offers.some((savedOffer) => savedOffer.offer_id === offer_id)
    ) {
      return res.status(403).json({ error: "You haven't saved this offer" });
    }
    const savedOffers = {
      offer_id,
      date: new Date(),
    };

    bidder.saved_offers.push(savedOffers);
    await bidder.save();

    res.status(200).json({ success: "Offer saved successfully" });
  } catch (err) {
    console.error("Error during getting offer's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer unsafe
router.get("/unsave/offer/:offer_id", async (req, res) => {
  const { offer_id } = req.params;
  const { id } = req.session;
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    const offer = await Offers.findById(offer_id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (
      !bidder.saved_offers.some(
        (savedOffer) => savedOffer.offer_id === offer_id
      )
    ) {
      return res.status(403).json({ error: "You haven't saved this offer" });
    }

    const index = bidder.saved_offers.findIndex(
      (savedOffer) => savedOffer.offer_id === offer_id
    );

    bidder.saved_offers.splice(index, 1);
    await bidder.save();
    res.status(200).json({ success: "Offer unsaved successfully" });
  } catch (err) {
    console.error("Error during unsaving of an offer :", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Offer apply
router.get("/add/apply/offer/:offerId", async (req, res) => {
  const { offerId } = req.params;
  const { id } = req.session;
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    if (bidder.isTrusted == false) {
      return res.status(403).json({ error: "You can't apply to this offers" });
    }

    const offer = await Offers.findById(offerId);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (offer.bidder_id.include(id)) {
      return res
        .status(403)
        .json({ error: "You already applied for this offer" });
    }

    offer.bidder_id.push(id);
    await offer.save();
    res.status(200).json({ success: "Offer applied successfully" });
  } catch (err) {
    console.error("Error during offer applying:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete offer apply
router.get("/delete/apply/offer/:offerId", async (req, res) => {
  const { offerId } = req.params;
  const { id } = req.session;
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
    if (index == -1) {
      res.status(404).json({ error: "you haven't apply to this offer" });
    }

    offer.bidder_id.splice(index, 1);
    await offer.save();
  } catch (err) {
    console.error("Error during deleting offer apply:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
