import { check } from "express-validator";
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
  check("id")
    .notEmpty()
    .withMessage("Offer budget is required"),
  handleValidationErrors,
];

export default offerValidationFields;
