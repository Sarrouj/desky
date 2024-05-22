import { check } from "express-validator";
import handleValidationErrors from "../middlewares/validationMiddleware.mjs";

const offerStateValidationFields = [
  check("offer_state")
    .notEmpty()
    .withMessage("Offer state is required")
    .isIn(["pending", "open", "closed", "finished", "rejected"])
    .withMessage(
      "Offer state must be one of: pending, open, closed, finished or rejected"
    ),
  handleValidationErrors,
];

export default offerStateValidationFields;
