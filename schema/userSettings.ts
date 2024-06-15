import { Curencies } from "@/lib/currencies";
import { z } from "zod";

export const updateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = Curencies.some((c) => c.value === value);
    if (!found) throw new Error("currency not found");
    return value;
  }),
});
