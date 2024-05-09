import mongoose from "mongoose";

// Define the schema for the AE collection
const AESchema = new mongoose.Schema(
  {
    AE_CIN: {
      type: {
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
      required: true,
    },
    AE_phoneNumber: {
      type: String,
      required: true,
    },
    AE_DoA: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      required: true,
    },
    AE_address: {
      type: String,
      required: true,
    },
    AE_location: {
      type: String,
      required: true,
    },
  },
  { collection: "AutoEntrepreneurs" }
);

// Create a model for the AE collection using the schema
const AE = mongoose.model("AE", AESchema);
// Export the model to be used in other parts of your application
export default AE;
