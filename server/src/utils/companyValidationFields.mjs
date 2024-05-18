import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const companyValidationFields = [
  check("company_name")
    .notEmpty()
    .withMessage("Company name is required")
    .isString()
    .withMessage("Company name must be a string"),
  check("company_phoneNumber")
    .notEmpty()
    .withMessage("Company phone number is required")
    .isString()
    .withMessage("Company phone number must be a string"),
  check("company_address")
    .notEmpty()
    .withMessage("Company address is required")
    .isString()
    .withMessage("Company address must be a string"),
  check("company_location")
    .notEmpty()
    .withMessage("Company location is required")
    .isString()
    .withMessage("Company location must be a string"),
  check("company_CR")
    .notEmpty()
    .withMessage("Company CR is required")
    .isString()
    .withMessage("Company CR must be a string"),
  check("company_DoA")
    .notEmpty()
    .withMessage("Company DoA is required")
    .isISO8601()
    .withMessage("Company DoA must be a valid date"),
  check("company_size")
    .notEmpty()
    .withMessage("Company size is required")
    .isNumeric()
    .withMessage("Company size must be a number"),
  handleValidationErrors,
];

export default companyValidationFields;
