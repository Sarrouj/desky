import mongoose from "mongoose";

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
    depositor_password: {
      type: String,
      required: true,
    },
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
          default: Date.now,
        },
      },
    ],
    depositor_CB: {
      type: Number,
      required: true,
      default: 70,
    },
    isTrusted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "Depositors" }
);

export default mongoose.model("Depositor", DepositorsSchema);
