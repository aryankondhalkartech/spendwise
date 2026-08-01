import express from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import validateObjectId from "../middlewares/validate-object-id.middleware.js";
import validateRequest from "../middlewares/validate-request.middleware.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../validators/transaction.validator.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", validateObjectId, getTransactionById);
router.post("/", validateRequest(createTransactionSchema), createTransaction);
router.patch(
  "/:id",
  validateObjectId,
  validateRequest(updateTransactionSchema),
  updateTransaction,
);
router.delete("/:id", validateObjectId, deleteTransaction);

export default router;
