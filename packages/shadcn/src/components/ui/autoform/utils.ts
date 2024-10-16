import { FieldConfig } from "@autoform/core";
import { SuperRefineFunction } from "@autoform/zod";
import { fieldConfig as baseFieldConfig } from "@autoform/react";
import { ReactNode } from "react";
import { FieldTypes } from "./AutoForm";

export function fieldConfig(
  config: FieldConfig<ReactNode, FieldTypes>
): SuperRefineFunction {
  return baseFieldConfig<FieldTypes>(config);
}
