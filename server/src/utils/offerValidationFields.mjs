import { check } from "express-validator";
import mongoose from "mongoose";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const offerValidationFields = [
  check("offer_title")
    .notEmpty()
    .withMessage("Offer title is required")
    .isString()
    .withMessage("Offer title must be a string"),
  check("offer_description")
    .notEmpty()
    .withMessage("Offer description is required")
    .isString()
    .withMessage("Offer description must be a string"),
  check("offer_category")
    .notEmpty()
    .withMessage("Offer category is required")
    .isArray()
    .withMessage("Offer category must be an array"),
  check("offer_location")
    .notEmpty()
    .withMessage("Offer location is required")
    .isString()
    .withMessage("Offer location must be a string"),
  check("offer_deadLine")
    .notEmpty()
    .withMessage("Offer deadline is required")
    .isISO8601()
    .withMessage("Offer deadline must be a valid date"),
  check("offer_budget")
    .notEmpty()
    .withMessage("Offer budget is required")
    .isNumeric()
    .withMessage("Offer budget must be a number"),
  check("offer_attachments")
    .notEmpty()
    .withMessage("Offer attachments are required")
    .isArray()
    .withMessage("Offer attachments must be an array"),
  check("offer_attachments.*.file_id")
    .notEmpty()
    .withMessage("File ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid file ID"),
  check("offer_attachments.*.file_name")
    .notEmpty()
    .withMessage("File name is required")
    .isString()
    .withMessage("File name must be a string"),
  check("offer_attachments.*.file_size")
    .notEmpty()
    .withMessage("File size is required")
    .isString()
    .withMessage("File size must be a string"),
  check("offer_attachments.*.upload_date")
    .notEmpty()
    .withMessage("Upload date is required")
    .isISO8601()
    .withMessage("Upload date must be a valid date"),
  handleValidationErrors,
];

export default offerValidationFields;
