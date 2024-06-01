import mongoose from "mongoose";

// Define the schema for the company collection
const CompaniesSchema = new mongoose.Schema(
  {
    company_type: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    company_phoneNumber: {
      type: String,
      required: true,
    },
    company_address: {
      type: String,
      required: true,
    },
    company_location: {
      type: String,
      required: true,
    },
    company_CR: {
      type: String,
      required: true,
    },
    company_DoA: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      required: true,
    },
    company_size: {
      type: String,
      required: true,
    },
  },
  { collection: "Companies" }
);

// Create a model for the company collection using the schema
const Companies = mongoose.model("Company", CompaniesSchema);
// Export the model to be used in other parts of your application
export default Companies;
