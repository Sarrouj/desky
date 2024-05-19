import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const offerStateValidationFields = [
  body("offer_state")
    .notEmpty()
    .withMessage("Offer state is required")
    .isIn(["pending", "open", "closed", "rejected"])
    .withMessage(
      "Offer state must be one of: pending, open, closed, or rejected"
    ),
  handleValidationErrors,
];

export default offerStateValidationFields;
