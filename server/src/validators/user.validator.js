import { z } from "zod";

export const updateCurrencyPreferenceSchema = z.object({
  currency: z.enum(["INR", "USD", "EUR", "GBP"]),
});
