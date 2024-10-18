import * as yup from "yup";
import { YupField, YupObjectOrWrapped } from "./types";

export function getYupFieldDefaultValue(schema: YupField): any {
  return schema.spec.default;
}

export function getDefaultValues(
  schema: YupObjectOrWrapped
): Record<string, any> {
  const defaultValues: Record<string, any> = {};

  for (const [key, field] of Object.entries(schema.fields)) {
    const defaultValue = getYupFieldDefaultValue(field as YupField);
    if (defaultValue !== undefined) {
      defaultValues[key] = defaultValue;
    }
  }

  return defaultValues;
}
