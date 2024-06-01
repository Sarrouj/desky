import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const registerValidationFields = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  handleValidationErrors,
];

export default registerValidationFields;
