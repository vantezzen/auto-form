import { z } from "zod";
import { ZodObjectOrWrapped } from "./types";

export function getDefaultValueInZodStack(schema: z.ZodTypeAny): any {
  if (schema instanceof z.ZodDefault) {
    return schema._def.defaultValue();
  }

  if (schema instanceof z.ZodEffects) {
    return getDefaultValueInZodStack(schema.innerType());
  }

  return undefined;
}

export function getDefaultValues(
  schema: ZodObjectOrWrapped
): Record<string, any> {
  const objectSchema =
    schema instanceof z.ZodEffects ? schema.innerType() : schema;
  const shape = objectSchema.shape;

  const defaultValues: Record<string, any> = {};

  for (const [key, field] of Object.entries(shape)) {
    const defaultValue = getDefaultValueInZodStack(field as z.ZodTypeAny);
    if (defaultValue !== undefined) {
      defaultValues[key] = defaultValue;
    }
  }

  return defaultValues;
}
