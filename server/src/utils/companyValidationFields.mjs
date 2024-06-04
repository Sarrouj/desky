import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const companyValidationFields = [
  check("company_type")
    .notEmpty()
    .withMessage("company_type is required")
    .isString()
    .withMessage("company_type must be a string"),
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
    .isArray()
    .withMessage("Company DoA must be at least one"),
  check("company_size")
    .notEmpty()
    .withMessage("Company size is required")
    .isNumeric()
    .withMessage("Company size must be a number"),
  handleValidationErrors,
];

export default companyValidationFields;
