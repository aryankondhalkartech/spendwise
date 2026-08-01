import express from "express";
import updateCurrencyPreference from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/preferences", updateCurrencyPreference);

export default router;
