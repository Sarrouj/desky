import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const loginValidationFields = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),
  handleValidationErrors,
];

export default loginValidationFields;
