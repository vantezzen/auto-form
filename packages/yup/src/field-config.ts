import { FieldConfig } from "@autoform/core";
import { YupField } from "./types";

export const FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

export function fieldConfig<AdditionalRenderable = null, FieldTypes = string>(
  config: FieldConfig<AdditionalRenderable, FieldTypes>
) {
  const transformFunction = function (value: any) {
    return value; // Always pass, we're just using this for metadata
  };
  transformFunction[FIELD_CONFIG_SYMBOL] = config;

  return transformFunction;
}

export function getYupFieldConfig(schema: YupField): FieldConfig | undefined {
  for (const transform of schema.transforms) {
    if (FIELD_CONFIG_SYMBOL in transform) {
      return (transform as any)[FIELD_CONFIG_SYMBOL];
    }
  }

  return undefined;
}
