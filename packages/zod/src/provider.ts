import { z } from "zod";
import { SchemaProvider, ParsedSchema } from "@autoform/core";
import { getDefaultValues } from "./default-values";
import { parseSchema } from "./schema-parser";

export class ZodProvider<T extends z.ZodObject<any, any>>
  implements SchemaProvider<z.infer<T>>
{
  constructor(private schema: T) {}

  parseSchema(): ParsedSchema {
    return parseSchema(this.schema);
  }

  validateSchema(values: z.infer<T>) {
    try {
      this.schema.parse(values);
      return { success: true, data: values } as const;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, errors: error.errors } as const;
      }
      throw error;
    }
  }

  getDefaultValues(): Record<string, any> {
    return getDefaultValues(this.schema);
  }
}
