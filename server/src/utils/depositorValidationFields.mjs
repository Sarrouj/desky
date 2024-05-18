import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const depositorValidationFields = [
  check("depositor_name")
    .notEmpty()
    .withMessage("Depositor name is required")
    .isString()
    .withMessage("Depositor name must be a string"),
  check("depositor_email")
    .notEmpty()
    .withMessage("Depositor email is required")
    .isEmail()
    .withMessage("Depositor email must be a valid email"),
  check("depositor_password")
    .notEmpty()
    .withMessage("Depositor password is required")
    .isString()
    .withMessage("Depositor password must be a string"),
  handleValidationErrors,
];

export default depositorValidationFields;
