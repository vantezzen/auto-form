import { FieldConfig } from "@autoform/core";
import { SuperRefineFunction } from "@autoform/zod";
import { fieldConfig as baseFieldConfig } from "@autoform/react";
import { ReactNode } from "react";
import { FieldTypes } from "./AutoForm";

/**
 * @deprecated Use `fieldConfig` from `@autoform/zod` or `@autoform/yup` with the "FieldTypes" type exported by this package instead.
 */
export function fieldConfig(
  config: FieldConfig<ReactNode, FieldTypes>
): SuperRefineFunction {
  return baseFieldConfig<FieldTypes>(config);
}
