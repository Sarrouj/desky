import { check, body } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const depositorValidationFields = [
  check("depositor_name")
    .notEmpty()
    .withMessage("depositor_name is required")
    .isString()
    .withMessage("depositor_name must be a string"),
  check("depositor_email")
    .notEmpty()
    .withMessage("depositor_email is required")
    .isEmail()
    .withMessage("depositor_email must be a valid email"),
  check("depositor_password")
    .optional()
    .isString()
    .withMessage("depositor_password must be a string"),
  check("depositor_review")
    .optional()
    .isArray()
    .withMessage("depositor_review must be an array"),
  body("depositor_review.*._id")
    .optional()
    .isString()
    .withMessage("Each review _id must be a string"),
  body("depositor_review.*.bidder_id")
    .optional()
    .isString()
    .withMessage("Each review bidder_id must be a string"),
  body("depositor_review.*.offer_id")
    .optional()
    .isString()
    .withMessage("Each review offer_id must be a string"),
  body("depositor_review.*.rating")
    .optional()
    .isNumeric()
    .withMessage("Each review rating must be a number"),
  body("depositor_review.*.text")
    .optional()
    .isString()
    .withMessage("Each review text must be a string"),
  body("depositor_review.*.date")
    .optional()
    .isISO8601()
    .withMessage("Each review date must be a valid date"),
  check("depositor_CB")
    .optional()
    .isNumeric()
    .withMessage("depositor_CB must be a number"),
  check("isTrusted")
    .optional()
    .isBoolean()
    .withMessage("isTrusted must be a boolean"),
  body("image.file_id")
    .optional()
    .isMongoId()
    .withMessage("image file_id must be a valid MongoDB ObjectId"),
  body("image.file_name")
    .optional()
    .isString()
    .withMessage("image file_name must be a string"),
  body("image.file_size")
    .optional()
    .isString()
    .withMessage("image file_size must be a string"),
  body("image.upload_date")
    .optional()
    .isISO8601()
    .withMessage("image upload_date must be a valid date"),
  handleValidationErrors,
];

export default depositorValidationFields;
