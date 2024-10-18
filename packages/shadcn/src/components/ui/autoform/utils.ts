import { FieldConfig } from "@autoform/core";
import {
  SuperRefineFunction,
  fieldConfig as baseFieldConfig,
} from "@autoform/zod";
import { ReactNode } from "react";
import { FieldTypes } from "./AutoForm";

export function fieldConfig(
  config: FieldConfig<ReactNode, FieldTypes>
): SuperRefineFunction {
  return baseFieldConfig<ReactNode, FieldTypes>(config);
}
