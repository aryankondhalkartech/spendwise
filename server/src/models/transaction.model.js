import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title should be at least 2 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: ["expense", "income"],
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transportation",
        "Shopping",
        "Entertainment",
        "Bills",
        "Healthcare",
        "Education",
        "Salary",
        "Investment",
        "Other",
      ],
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,

      maxlength: [1000, "Note cannot exceed 1000 characters"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
