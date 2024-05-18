import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const AEValidationFields = [
  check("AE_CIN")
    .notEmpty()
    .withMessage("AE CIN is required")
    .isString()
    .withMessage("AE CIN must be a string"),
  check("AE_phoneNumber")
    .notEmpty()
    .withMessage("AE phone number is required")
    .isString()
    .withMessage("AE phone number must be a string"),
  check("AE_DoA")
    .notEmpty()
    .withMessage("AE DoA is required")
    .isISO8601()
    .withMessage("AE DoA must be a valid date"),
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
