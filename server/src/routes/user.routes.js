import express from "express";
import updateCurrencyPreference from "../controllers/user.controller.js";
import validateRequest from "../middlewares/validate-request.middleware.js";
import { updateCurrencyPreferenceSchema } from "../validators/user.validator.js";

const router = express.Router();

router.patch(
  "/preferences",
  validateRequest(updateCurrencyPreferenceSchema),
  updateCurrencyPreference,
);

export default router;
