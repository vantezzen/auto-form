import { SchemaProvider } from "./schema-provider";
import { ParsedSchema } from "./types";

export function parseSchema(schemaProvider: SchemaProvider): ParsedSchema {
  return schemaProvider.parseSchema();
}

export function validateSchema(schemaProvider: SchemaProvider, values: any) {
  return schemaProvider.validateSchema(values);
}

export function getDefaultValues(
  schemaProvider: SchemaProvider,
): Record<string, any> {
  return schemaProvider.getDefaultValues();
}
