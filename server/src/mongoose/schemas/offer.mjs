import mongoose from "mongoose";

// Define the schema for the offer collection
const OffersSchema = new mongoose.Schema(
  {
    offer_title: {
      type: String,
      required: true,
    },
    offer_description: {
      type: String,
      required: true,
    },
    offer_category: {
      type: [
        {
          type: String,
          required: true,
          unique: true,
        },
      ],
      required: true,
    },
    offer_DoP: {
      type: Date,
      required: true,
      default: Date.now,
    },
    offer_location: {
      type: String,
      required: true,
    },
    offer_deadLine: {
      type: Date,
      required: true,
    },
    offer_budget: {
      type: Number,
      required: true,
    },
    offer_attachments: {
      type: String,
      required: true,
    },
    offer_status: {
      type: String,
      required: true,
      default: "pending",
    },
    depositor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depositors",
      required: true,
    },
    offer_apply: [
      {
        bidder_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bidders",
          required: true,
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
    offer_state: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { collection: "Offers" }
);

const Offers = mongoose.model("Offer", OffersSchema);
export default Offers;
