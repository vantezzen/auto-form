import { FieldConfig } from "@autoform/core";
import * as yup from "yup";
import { YupEnumSchema, YupField } from "./types";

export function inferFieldType(
  schema: YupField,
  fieldConfig?: FieldConfig
): string {
  if (fieldConfig?.fieldType) {
    return fieldConfig.fieldType;
  }

  const enumSchema = schema as unknown as YupEnumSchema;
  const isEnum = enumSchema._whitelist && enumSchema._whitelist.size > 0;
  if (isEnum) {
    return "select";
  }

  if (
    ["string", "number", "boolean", "date", "array", "object"].includes(
      schema.type
    )
  ) {
    return schema.type;
  }
  return "string"; // Default to string for unknown types
}
