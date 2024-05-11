// Packages
import express from "express";
const router = express.Router();

// Schemas
import Depositors from "../mongoose/schemas/depositor.mjs";
import AE from "../mongoose/schemas/AE.mjs";
import Bidders from "../mongoose/schemas/bidder.mjs";
import Companies from "../mongoose/schemas/company.mjs";

// Depositor profile info
router.get("/depositor", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    res.status(200).json(depositor);
  } catch (err) {
    console.error("Error during getting depositor's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Depositor info
router.get("/depositor/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    res.status(200).json({ success: depositor });
  } catch (err) {
    console.error("Error during getting depositor's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Depositor edit
router.put("/edit/depositor", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { depositor_name, depositor_email, depositor_password } = req.body;
  if (!depositor_name || !depositor_email || !depositor_password) {
    return res.status(400).json({ message: "All the fields are required" });
  }
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
    if (depositor.depositor_password !== depositor_password) {
      depositor.depositor_password = depositor_password;
    }

    await depositor.save();
    res
      .status(201)
      .json({ success: "Depositor's information updated successfully" });
  } catch (err) {
    console.error("Error during editing depositor's information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Depositor add AE info
router.post("/add/depositor/AE", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { AE_CIN, AE_phoneNumber, AE_DoA, AE_address, AE_location } = req.body;
  if (!AE_CIN || !AE_phoneNumber || !AE_DoA || !AE_address || !AE_location) {
    return res.status(400).json({ message: "All the fields are required" });
  }
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
      .json({ success: "auto entrepreneur information added successfully" });
  } catch (err) {
    console.error(
      "Error during adding depositor's auto entrepreneur information:",
      err
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

// Depositor add company info
router.post("/add/depositor/company", async (req, res) => {
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
    res.status(201).json({
      success: "company information added successfully",
    });
  } catch (err) {
    console.error("Error during adding depositor's company information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// depositor Rate a bidder
router.post("/rate/depositor/:bidder_id/:offer_id", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { rating, text } = req.body;
  if (!rating || !text) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  const { bidder_id, offer_id } = req.params;

  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    const bidder = await Bidders.findById(bidder_id);
    if (!bidder) {
      return res.status(404).json({ error: "bidder not found" });
    }

    const offer = await Bidders.findById(offer_id);
    if (!offer) {
      return res.status(404).json({ error: "offer not found" });
    }

    if (
      offer.depositor_id !== id &&
      offer.depositor_id.includes(bidder_id) &&
      offer.offer_state !== "finished"
    ) {
      return res.status(404).json({ error: "you cant rate this bidder" });
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
    res.status(201).json({
      success: "rating added successfully",
    });
  } catch (err) {
    console.error("Error during depositor's rating information:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// depositor merge account
router.post("/merge/depositor", async (req, res) => {
  const { id } = req.session.user;
  if (!id) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const depositor = await Depositors.findById(id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    if (depositor.isTrusted == false) {
      return res.status(401).json({
        error: "need to fill auto entrepreneur or company information first",
      });
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
    res.status(201).json({
      success: "depositor account merged successfully",
    });
  } catch (err) {
    console.error("Error during depositor account merging:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
