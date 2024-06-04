import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const AEValidationFields = [
  check("AE_phoneNumber")
    .notEmpty()
    .withMessage("AE phone number is required")
    .isString()
    .withMessage("AE phone number must be a string"),
  check("AE_DoA")
    .notEmpty()
    .withMessage("AE DoA is required")
    .isArray()
    .withMessage("AE DoA must be an array"),
  check("AE_address")
    .notEmpty()
    .withMessage("AE address is required")
    .isString()
    .withMessage("AE address must be a string"),
  check("AE_location")
    .notEmpty()
    .withMessage("AE location is required")
    .isString()
    .withMessage("AE location must be a string"),
  handleValidationErrors,
];

export default AEValidationFields;
