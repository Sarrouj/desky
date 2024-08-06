import { check, body } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const bidderValidationFields = [
  check("bidder_name")
    .notEmpty()
    .withMessage("bidder_name is required")
    .isString()
    .withMessage("bidder_name must be a string"),
  check("bidder_email")
    .notEmpty()
    .withMessage("bidder_email is required")
    .isEmail()
    .withMessage("bidder_email must be a valid email"),
  check("bidder_password")
    .optional()
    .isString()
    .withMessage("bidder_password must be a string"),
  check("bidder_review")
    .optional()
    .isArray()
    .withMessage("bidder_review must be an array"),
  body("bidder_review.*._id")
    .optional()
    .isString()
    .withMessage("Each review _id must be a string"),
  body("bidder_review.*.depositor_id")
    .optional()
    .isString()
    .withMessage("Each review depositor_id must be a string"),
  body("bidder_review.*.offer_id")
    .optional()
    .isString()
    .withMessage("Each review offer_id must be a string"),
  body("bidder_review.*.rating")
    .optional()
    .isNumeric()
    .withMessage("Each review rating must be a number"),
  body("bidder_review.*.text")
    .optional()
    .isString()
    .withMessage("Each review text must be a string"),
  body("bidder_review.*.date")
    .optional()
    .isISO8601()
    .withMessage("Each review date must be a valid date"),
  check("bidder_CB")
    .optional()
    .isNumeric()
    .withMessage("bidder_CB must be a number"),
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
  check("saved_offers")
    .optional()
    .isArray()
    .withMessage("saved_offers must be an array"),
  body("saved_offers.*.offer_id")
    .optional()
    .isString()
    .withMessage("Each saved offer_id must be a string"),
  body("saved_offers.*.date")
    .optional()
    .isISO8601()
    .withMessage("Each saved offer date must be a valid date"),
  handleValidationErrors,
];

export default bidderValidationFields;
