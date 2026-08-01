import express from "express";
import updateCurrencyPreference from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/preferences", auth, updateCurrencyPreference);

export default router;
