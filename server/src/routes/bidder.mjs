import express from "express";
const router = express.Router();

// Schemas
import Bidders from "../mongoose/schemas/Bidder.mjs";
import Depositors from "../mongoose/schemas/Depositor.mjs";
import Offers from "../mongoose/schemas/Offer.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Companies from "../mongoose/schemas/Company.mjs";

// Bidder profile info
router.get("/bidder", async (req, res) => {
  const { id } = rep.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    res.status(200).json(bidder);
  } catch (err) {
    console.error("Error during getting bidder's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Bidder info
router.get("/bidder/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
    }

    res.status(200).json({ success: bidder });
  } catch (err) {
    console.error("Error during getting bidder's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// bidder edit
router.put("/edit/bidder", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { bidder_name, bidder_email, bidder_password } = req.body;
  if (!bidder_name || !bidder_email || !bidder_password) {
    return res.status(400).json({ message: "All the fields are required" });
  }
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
    if (bidder.bidder_password !== bidder_password) {
      bidder.bidder_password = bidder_password;
    }

    await bidder.save();
    res
      .status(201)
      .json({ success: "Bidder's information updated successfully" });
  } catch (err) {
    console.error("Error during editing bidder's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Bidder add AE info
router.post("/add/bidder/AE", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { AE_CIN, AE_phoneNumber, AE_DoA, AE_address, AE_location } = req.body;
  if (!AE_CIN || !AE_phoneNumber || !AE_DoA || !AE_address || !AE_location) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "Bidder not found" });
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
      .json({ success: "auto entrepreneur information added successfully" });
  } catch (err) {
    console.error(
      "Error during adding bidder's auto entrepreneur information:",
      err
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

// Bidder add company info
router.post("/add/bidder/company", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const {
    company_name,
    company_phoneNumber,
    company_address,
    company_location,
    company_CR,
    company_DoA,
    company_size,
  } = req.body;
  if (
    !company_name ||
    !company_phoneNumber ||
    !company_address ||
    !company_location ||
    !company_CR ||
    !company_DoA ||
    !company_size
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  try {
    const bidder = await Bidders.findById(id);
    if (!bidder) {
      return res.status(404).json({ error: "bidder not found" });
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
    console.error("Error during adding bidder's company information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Bidder rate a depositor
router.post("/rate/bidder/:depositor_id/:offer_id", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { rating, text } = req.body;
  if (!rating || !text) {
    return res.status(400).json({ message: "All the fields are required" });
  }

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
    console.error("Error during bidder's rating:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Bidder merge account
router.post("/merge/bidder", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
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
    console.error("Error during bidder account merging:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
