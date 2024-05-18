import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const bidderValidationFields = [
  check("bidder_name")
    .notEmpty()
    .withMessage("Bidder name is required")
    .isString()
    .withMessage("Bidder name must be a string"),
  check("bidder_email")
    .notEmpty()
    .withMessage("Bidder email is required")
    .isEmail()
    .withMessage("Bidder email must be a valid email"),
  check("bidder_password")
    .notEmpty()
    .withMessage("Bidder password is required")
    .isString()
    .withMessage("Bidder password must be a string"),
  handleValidationErrors,
];

export default bidderValidationFields;
