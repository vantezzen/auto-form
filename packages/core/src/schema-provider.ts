import { ParsedSchema, SchemaValidation } from "./types";

export interface SchemaProvider<T = any> {
  parseSchema(): ParsedSchema;
  validateSchema(values: T): SchemaValidation;
  getDefaultValues(): Record<string, any>;
}
