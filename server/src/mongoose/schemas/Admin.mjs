import mongoose from "mongoose";

// Define the schema for the admin collection
const AdminsSchema = new mongoose.Schema(
  {
    admin_name: {
      type: String,
      required: true,
    },
    admin_email: {
      type: String,
      required: true,
      unique: true,
    },
    admin_password: {
      type: String,
      required: true,
    },
  },
  { collection: "Admins" }
);

// Create a model for the Admins collection using the schema
const Admins = mongoose.model("Admins", AdminsSchema);
// Export the model to be used in other parts of your application
export default Admins;
