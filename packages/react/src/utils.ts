import { FieldConfig } from "@autoform/core";
import {
  SuperRefineFunction,
  fieldConfig as baseFieldConfig,
} from "@autoform/zod";
import { ReactNode } from "react";

/**
 * @deprecated Use `fieldConfig` from `@autoform/zod` or `@autoform/yup` with "React.ReactNode" for Renderables instead.
 */
export function fieldConfig<FieldTypes = string>(
  config: FieldConfig<ReactNode, FieldTypes>
): SuperRefineFunction {
  return baseFieldConfig<ReactNode, FieldTypes>(config);
}
