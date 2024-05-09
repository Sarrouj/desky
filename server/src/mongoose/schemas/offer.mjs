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
    offer_attachments: [
      {
        file_id: {
          type: mongoose.Types.ObjectId, // Store the GridFS file ObjectId
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
    depositor_id: {
      type: String,
      required: true,
    },
    bidder_id: [],
    offer_state: {
      type: String,
      required: true,
      default: "pending"
    },
  },
  { collection: "Offers" }
);

// Create a model for the offer collection using the schema
const Offers = mongoose.model("Offer", OffersSchema);
// Export the model to be used in other parts of your application
export default Offers;
