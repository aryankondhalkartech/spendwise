import express from "express";
import {
  register,
  login,
  getCurrentUser,
  logout,
} from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/validate-request.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
