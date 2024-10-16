import { z } from "zod";
import { ZodObjectOrWrapped } from "./types";

export function validateSchema(schema: ZodObjectOrWrapped, values: any) {
  try {
    schema.parse(values);
    return { success: true, data: values };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    throw error;
  }
}
