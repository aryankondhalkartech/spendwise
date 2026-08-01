import express from "express";
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import validateObjectId from "../middlewares/validate-object-id.middleware.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:id", validateObjectId, getTransactionById);
router.post("/", createTransaction);
router.patch("/:id", validateObjectId, updateTransaction);
router.delete("/:id", validateObjectId, deleteTransaction);

export default router;
