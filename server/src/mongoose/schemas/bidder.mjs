// models/Bidder.mjs
import mongoose from "mongoose";

const BiddersSchema = new mongoose.Schema(
  {
    bidder_name: {
      type: String,
      required: true,
    },
    bidder_email: {
      type: String,
      required: true,
      unique: true,
    },
    bidder_password: {
      type: String,
      required: true,
    },
    bidder_review: [
      {
        _id: {
          type: String,
          default: () => mongoose.Types.ObjectId().toString(),
          required: true,
        },
        depositor_id: {
          type: String,
          required: true,
        },
        offer_id: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    bidder_CB: {
      type: Number,
      required: true,
      default: 70,
    },
    isTrusted: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      file_id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      file_name: {
        type: String,
        required: true,
      },
      file_size: {
        type: String,
        required: true,
      },
      upload_date: {
        type: Date,
        required: true,
      },
    },
    saved_offers: [
      {
        offer_id: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { collection: "Bidders" }
);

export default mongoose.model("Bidder", BiddersSchema);
