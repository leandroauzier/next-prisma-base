import { z } from "zod";

export function formatZodErrors<T>(error: z.ZodError<T>) {
  return z.treeifyError(error);
}
