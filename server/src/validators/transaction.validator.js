import { z } from "zod";

const expenseCategories = [
  "Food",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Education",
  "Other",
];

const incomeCategories = ["Salary", "Investment", "Other"];

const transactionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title should be at least 2 characters")
    .max(100, "Title cannot exceed 100 characters"),

  amount: z.number().positive("Amount must be greater than 0"),

  type: z.enum(["expense", "income"]),

  category: z.string(),

  date: z.coerce.date().optional(),

  note: z
    .string()
    .trim()
    .max(1000, "Note cannot exceed 1000 characters")
    .optional(),
});

const validateCategory = (schema) =>
  schema.superRefine((data, ctx) => {
    if (data.type === "expense" && !expenseCategories.includes(data.category)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["category"],
        message: "Invalid expense category",
      });
    }

    if (data.type === "income" && !incomeCategories.includes(data.category)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["category"],
        message: "Invalid income category",
      });
    }
  });

export const createTransactionSchema = validateCategory(transactionSchema);

export const updateTransactionSchema = validateCategory(
  transactionSchema.partial(),
);
