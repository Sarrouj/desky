import mongoose from "mongoose";

// Define the schema for the depositor collection
const DepositorsSchema = new mongoose.Schema(
  {
    depositor_name: {
      type: String,
      required: true,
    },
    depositor_email: {
      type: String,
      required: true,
      unique: true,
    },
    depositor_password: String,
    depositor_review: [
      {
        _id: {
          type: String,
          default: () => mongoose.Types.ObjectId().toString(),
          required: true,
        },
        bidder_id: {
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
    depositor_CB: {
      type: Number,
      required: true,
      default: 1000,
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
  },
  { collection: "Depositors" }
);

// Create a model for the depositor collection using the schema
const Depositors = mongoose.model("Depositor", DepositorsSchema);
// Export the model to be used in other parts of your application
export default Depositors;
