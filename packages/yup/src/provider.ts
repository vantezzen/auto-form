import * as yup from "yup";
import { SchemaProvider } from "@autoform/core";
import { parseSchema } from "./schema-parser";
import { validateSchema } from "./validator";
import { getDefaultValues } from "./default-values";
import { YupObjectOrWrapped } from "./types";

export class YupProvider<T extends yup.AnyObjectSchema>
  implements SchemaProvider
{
  /**
   * Provider to use Yup schemas for AutoForm
   *
   * @param schema - Yup schema to use for validation
   */
  constructor(private schema: T) {
    if (!schema) {
      throw new Error("YupProvider: schema is required");
    }
  }

  parseSchema() {
    return parseSchema(this.schema);
  }

  validateSchema(values: any) {
    return validateSchema(this.schema, values);
  }

  getDefaultValues() {
    return getDefaultValues(this.schema);
  }
}
