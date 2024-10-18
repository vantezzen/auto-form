import * as yup from "yup";
import { inferFieldType } from "./field-type-inference";
import { getYupFieldDefaultValue } from "./default-values";
import { getYupFieldConfig } from "./field-config";
import { ParsedField, ParsedSchema } from "@autoform/core";
import { YupEnumSchema, YupField, YupObjectOrWrapped } from "./types";

function parseField(key: string, schema: YupField): ParsedField {
  const fieldConfig = getYupFieldConfig(schema);
  const type = inferFieldType(schema, fieldConfig);
  const defaultValue = getYupFieldDefaultValue(schema);

  // Enums
  let optionValues: [string, string][] = [];
  const enumSchema = schema as unknown as YupEnumSchema;
  if (
    schema.type === "mixed" &&
    enumSchema._whitelist &&
    enumSchema._whitelist.size > 0
  ) {
    const options = enumSchema._whitelist;
    optionValues = [...options].map((value) => [value, value]);
  }

  // Arrays and objects
  let subSchema: ParsedField[] = [];
  const objectSchema = schema as yup.ObjectSchema<any>;
  if (schema.type === "object" && objectSchema.fields) {
    subSchema = Object.entries(objectSchema.fields).map(([key, field]) =>
      parseField(key, field as YupField)
    );
  }
  const arraySchema = schema as yup.ArraySchema<any, any>;
  if (schema.type === "array" && arraySchema.innerType) {
    subSchema = [parseField("0", arraySchema.innerType as YupField)];
  }

  return {
    key,
    type,
    required: !schema.spec.optional,
    default: defaultValue,
    description: schema.spec.label,
    fieldConfig,
    options: optionValues,
    schema: subSchema,
  };
}

export function parseSchema(schema: YupObjectOrWrapped): ParsedSchema {
  const fields: ParsedField[] = Object.entries(schema.fields).map(
    ([key, field]) => parseField(key, field as YupField)
  );

  return { fields };
}
