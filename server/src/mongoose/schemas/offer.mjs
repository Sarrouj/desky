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
    offer_deadline: {
      type: Date,
      required: true,
    },
    offer_budget: {
      type: Number,
      required: true,
    },
    offer_attachment: {
      type: String,
    },
    depositor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depositors",
      required: true,
    },
    offer_apply: {
      type: [
        {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
            required: true,
          },
          bidder_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bidders",
            required: true,
          },
          estimate: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
            default: Date.now,
          },
        },
      ],
      required: true,
      default: [],
    },
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
