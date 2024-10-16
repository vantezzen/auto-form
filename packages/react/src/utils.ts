import { FieldConfig } from "@autoform/core";
import {
  SuperRefineFunction,
  fieldConfig as baseFieldConfig,
} from "@autoform/zod";
import { ReactNode } from "react";

export function fieldConfig<FieldTypes = string>(
  config: FieldConfig<ReactNode, FieldTypes>,
): SuperRefineFunction {
  return baseFieldConfig<ReactNode, FieldTypes>(config);
}
