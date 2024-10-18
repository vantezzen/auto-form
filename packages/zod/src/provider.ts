import { z } from "zod";
import { SchemaProvider, ParsedSchema, SchemaValidation } from "@autoform/core";
import { getDefaultValues } from "./default-values";
import { parseSchema } from "./schema-parser";

export class ZodProvider<T extends z.ZodObject<any, any>>
  implements SchemaProvider<z.infer<T>>
{
  /**
   * Provider to use Zod schemas for AutoForm
   *
   * @param schema - Zod schema to use for validation
   */
  constructor(private schema: T) {
    if (!schema) {
      throw new Error("ZodProvider: schema is required");
    }
  }

  parseSchema(): ParsedSchema {
    return parseSchema(this.schema);
  }

  validateSchema(values: z.infer<T>): SchemaValidation {
    try {
      this.schema.parse(values);
      return { success: true, data: values } as const;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map((error) => ({
            path: error.path,
            message: error.message,
          })),
        } as const;
      }
      throw error;
    }
  }

  getDefaultValues(): Record<string, any> {
    return getDefaultValues(this.schema);
  }
}
