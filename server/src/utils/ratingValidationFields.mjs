import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const ratingValidationFields = [
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be a number"),
  check("text")
    .notEmpty()
    .withMessage("Text is required")
    .isString()
    .withMessage("Text must be a string"),
  handleValidationErrors,
];

export default ratingValidationFields;
