import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const adminValidationFields = [
  check("admin_name")
    .notEmpty()
    .withMessage("admin name is required")
    .isString()
    .withMessage("admin name must be a string"),
  check("admin_email")
    .notEmpty()
    .withMessage("admin email is required")
    .isEmail()
    .withMessage("admin email must be a valid email"),
  check("admin_password")
    .notEmpty()
    .withMessage("admin password is required")
    .isString()
    .withMessage("admin password must be a string"),
  handleValidationErrors,
];

export default adminValidationFields;
