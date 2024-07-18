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

// Depositor's Profile Info
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

// Depositor's Info
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

// Depositor's AE or Company info
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

// Depositor's reviews
router.get("/depositor/reviews/:id", async (req, res, next) => {
  try {
    const depositor = await Depositors.findById(req.params.id);
    if (!depositor) {
      return res.status(404).json({ error: "Depositor not found" });
    }

    // Process reviews and gather necessary details
    const detailedReviews = await Promise.all(
      depositor.depositor_review.map(async (review) => {
        const bidder = await Bidders.findById(review.bidder_id);
        if (!bidder) {
          return res
            .status(404)
            .json({ error: `Bidder with id ${review.bidder_id} not found` });
        }
        const offer = await Offers.findById(review.offer_id);
        if (!offer) {
          return res
            .status(404)
            .json({ error: `Offer with id ${review.offer_id} not found` });
        }
        return {
          bidder_name: bidder.bidder_name,
          offer_title: offer.offer_title,
          reviews: [review],
        };
      })
    );

    res.status(200).json({ success: detailedReviews });
  } catch (err) {
    next(err);
  }
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Depositor's dashboard info
router.get(
  "/depositor/dashboard/:id",
  checkObjectId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offers = await Offers.find({ depositor_id: id });
      if (offers.length === 0) {
        return res.status(200).json({
          success: {
            totalOffersPosted: 0,
            totalBidsReceived: 0,
            totalOffersClosed: 0,
            averageRating: 0,
            detailedBids: [],
          },
        });
      }

      const totalOffersPosted = offers.length;
      const totalBidsReceived = offers.reduce(
        (acc, offer) => acc + offer.offer_apply.length,
        0
      );
      const totalOffersClosed = offers.filter(
        (offer) => offer.offer_state === "closed"
      ).length;
      const averageRating =
        depositor.depositor_review.length > 0
          ? (
              depositor.depositor_review.reduce(
                (acc, review) => acc + review.rating,
                0
              ) / depositor.depositor_review.length
            ).toFixed(1)
          : 0;

      // Collect detailed bids with bidder information
      const detailedBids = await offers.reduce(async (accPromise, offer) => {
        const acc = await accPromise;
        for (const bid of offer.offer_apply) {
          const bidder = await Bidders.findById(bid.bidder_id);
          if (bidder) {
            acc.push({
              offer_title: offer.offer_title,
              bidder_id: bidder._id,
              bidder_name: bidder.bidder_name,
              bidder_email: bidder.bidder_email,
              bidder_avgRating:
                bidder.bidder_review.length > 0
                  ? (
                      bidder.bidder_review.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / bidder.bidder_review.length
                    ).toFixed(1)
                  : 0,
              bid_Date: bid.date,
              bid_est: bid.estimate,
              bidder_review: bidder.bidder_review,
            });
          }
        }
        return acc;
      }, Promise.resolve([]));

      res.status(200).json({
        success: {
          totalOffersPosted,
          totalBidsReceived,
          totalOffersClosed,
          averageRating,
          detailedBids,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Depositor's manage bids info
router.get(
  "/depositor/mangeBids/:id",
  checkObjectId,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const depositor = await Depositors.findById(id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offers = await Offers.find({ depositor_id: id });
      if (offers.length === 0) {
        return res.status(200).json({
          success: {
            detailedBids: [],
          },
        });
      }

      const detailedBids = await offers.reduce(async (accPromise, offer) => {
        const acc = await accPromise;
        for (const bid of offer.offer_apply) {
          const bidder = await Bidders.findById(bid.bidder_id);
          if (bidder) {
            acc.push({
              offer_title: offer.offer_title,
              bidder_id: bidder._id,
              bidder_name: bidder.bidder_name,
              bidder_email: bidder.bidder_email,
              bidder_avgRating:
                bidder.bidder_review.length > 0
                  ? (
                      bidder.bidder_review.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / bidder.bidder_review.length
                    ).toFixed(1)
                  : 0,
              bid_Date: bid.date,
              bid_est: bid.estimate,
              bidder_review: bidder.bidder_review,
            });
          }
        }
        return acc;
      }, Promise.resolve([]));

      res.status(200).json({
        success: {
          detailedBids,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Depositor's offers
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
        to: email,
        subject: "Your Account Status",
        text: `Hello ${depositor.depositor_name}`,
        html: `<!DOCTYPE html>
  <html>
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
          <h4>Hello ${depositor.depositor_name}</h4>
          <p>
           Your account need to be verified by the admin, it will take up to 24 hours.
          </p>
          <h3>
            Thank you for your patience.
          </h3>
        </div>
        <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
      </div>
    </body>
  </html>
  `,
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
        to: email,
        subject: "Your Account Status",
        text: `Hello ${depositor.depositor_name}`,
        html: `<!DOCTYPE html>
  <html>
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
          <h4>Hello ${depositor.depositor_name}</h4>
          <p>
           Your account need to be verified by the admin, it will take up to 24 hours.
          </p>
          <h3>
            Thank you for your patience.
          </h3>
        </div>
        <div class="email-footer">&copy; 2024 Desky. All rights reserved.</div>
      </div>
    </body>
  </html>
  `,
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

    if (!depositor.isTrusted) {
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

// Depositor Accept bid
router.post(
  "/accept/depositor/bid/:bid_id",
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { bid_id } = req.params;
    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findOne({ "offer_apply._id": bid_id });
      if (!offer) {
        return res.status(404).json({ error: "Bid not found" });
      }

      offer.offer_apply = offer.offer_apply.filter((bid) => {
        return bid._id.toString() === bid_id;
      });

      offer.offer_state = "inProgress";
      await offer.save();
      res.status(200).json({ success: "Bid accepted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Depositor Refuse bid
router.post(
  "/refuse/depositor/bid/:bid_id",
  checkSessionId,
  async (req, res, next) => {
    const { user_id } = req.body;
    const { bid_id } = req.params;
    try {
      const depositor = await Depositors.findById(user_id);
      if (!depositor) {
        return res.status(404).json({ error: "Depositor not found" });
      }

      const offer = await Offers.findOne({ "offer_apply._id": bid_id });
      if (!offer) {
        return res.status(404).json({ error: "Bid not found" });
      }

      offer.offer_apply = offer.offer_apply.filter((bid) => {
        return bid._id.toString() !== bid_id;
      });

      await offer.save();
      res.status(200).json({ success: "Bid refused successfully" });
    } catch (err) {
      next(err);
    }
  }
);

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// Error handling middleware
router.use(handleErrors);

export default router;
