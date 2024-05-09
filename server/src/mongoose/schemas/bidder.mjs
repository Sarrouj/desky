import mongoose from "mongoose";

// Define the schema for the bidder collection
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
    bidder_password: String,
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
        text: String,
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    bidder_CB: {
      type: Number,
      required: true,
      default: 1000,
    },
    isTrusted: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: [
      {
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
    ],
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

// Create a model for the bidder collection using the schema
const Bidders = mongoose.model("Bidder", BiddersSchema);
// Export the model to be used in other parts of your application
export default Bidders;
