import { RefinementEffect, z } from "zod";
import { FieldConfig } from "../../core/dist";
export const FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");
export type SuperRefineFunction = () => unknown;

export function fieldConfig<AdditionalRenderable = null, FieldTypes = string>(
  config: FieldConfig<AdditionalRenderable, FieldTypes>,
): SuperRefineFunction {
  const refinementFunction: SuperRefineFunction = () => {
    // Do nothing.
  };

  // @ts-expect-error This is a symbol and not a real value.
  refinementFunction[FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}

export function getFieldConfigInZodStack(
  schema: z.ZodTypeAny,
): FieldConfig | undefined {
  const typedSchema = schema as unknown as z.ZodEffects<
    z.ZodNumber | z.ZodString
  >;

  if (typedSchema._def.typeName === "ZodEffects") {
    const effect = typedSchema._def.effect as RefinementEffect<any>;
    const refinementFunction = effect.refinement;

    if (FIELD_CONFIG_SYMBOL in refinementFunction) {
      return refinementFunction[FIELD_CONFIG_SYMBOL] as FieldConfig;
    }
  }

  if ("innerType" in typedSchema._def) {
    return getFieldConfigInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny,
    );
  }
  if ("schema" in typedSchema._def) {
    return getFieldConfigInZodStack(
      (typedSchema._def as any).schema as z.ZodAny,
    );
  }

  return undefined;
}
