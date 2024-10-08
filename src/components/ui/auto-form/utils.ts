import React from "react";
import { DefaultValues } from "react-hook-form";
import { RefinementEffect, z } from "zod";
import { FieldConfig, FieldConfigItem, SuperRefineFunction } from "./types";

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodEffects<z.ZodObject<any, any>>;

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // if numbers only return the string
  let output = string.replace(/([A-Z])/g, " $1");
  output = output.charAt(0).toUpperCase() + output.slice(1);
  return output;
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<
  ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny,
>(schema: ChildType | z.ZodEffects<ChildType>): ChildType | null {
  if (!schema) return null;
  if ("innerType" in schema._def) {
    return getBaseSchema(schema._def.innerType as ChildType);
  }
  if ("schema" in schema._def) {
    return getBaseSchema(schema._def.schema as ChildType);
  }

  return schema as ChildType;
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny): string {
  const baseSchema = getBaseSchema(schema);
  return baseSchema ? baseSchema._def.typeName : "";
}

/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString
  >;

  if (typedSchema._def.typeName === "ZodDefault") {
    return typedSchema._def.defaultValue();
  }

  if ("innerType" in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny
    );
  }
  if ("schema" in typedSchema._def) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as z.ZodAny
    );
  }

  return undefined;
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema,
  fieldConfig?: FieldConfig<z.infer<Schema>>
) {
  if (!schema) return null;
  const { shape } = schema;
  type DefaultValuesType = DefaultValues<Partial<z.infer<Schema>>>;
  const defaultValues = {} as DefaultValuesType;
  if (!shape) return defaultValues;

  for (const key of Object.keys(shape)) {
    const item = shape[key] as z.ZodAny;

    if (getBaseType(item) === "ZodObject") {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>,
        fieldConfig?.[key] as FieldConfig<z.infer<Schema>>
      );

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}` as keyof DefaultValuesType;
          defaultValues[pathKey] = defaultItems[defaultItemKey];
        }
      }
    } else {
      let defaultValue = getDefaultValueInZodStack(item);
      if (
        (defaultValue === null || defaultValue === "") &&
        fieldConfig?.[key]?.inputProps
      ) {
        defaultValue = (fieldConfig?.[key]?.inputProps as unknown as any)
          .defaultValue;
      }
      if (defaultValue !== undefined) {
        defaultValues[key as keyof DefaultValuesType] = defaultValue;
      }
    }
  }

  return defaultValues;
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped
): z.ZodObject<any, any> {
  if (schema?._def.typeName === "ZodEffects") {
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>;
    return getObjectFormSchema(typedSchema._def.schema);
  }
  return schema as z.ZodObject<any, any>;
}

/**
 * Convert a Zod schema to HTML input props to give direct feedback to the user.
 * Once submitted, the schema will be validated completely.
 */
export function zodToHtmlInputProps(
  schema:
    | z.ZodNumber
    | z.ZodString
    | z.ZodOptional<z.ZodNumber | z.ZodString>
    | any
): React.InputHTMLAttributes<HTMLInputElement> {
  if (["ZodOptional", "ZodNullable"].includes(schema._def.typeName)) {
    const typedSchema = schema as z.ZodOptional<z.ZodNumber | z.ZodString>;
    return {
      ...zodToHtmlInputProps(typedSchema._def.innerType),
      required: false,
    };
  }
  const typedSchema = schema as z.ZodNumber | z.ZodString;

  if (!("checks" in typedSchema._def))
    return {
      required: true,
    };

  const { checks } = typedSchema._def;
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    required: true,
  };
  const type = getBaseType(schema);

  for (const check of checks) {
    if (check.kind === "min") {
      if (type === "ZodString") {
        inputProps.minLength = check.value;
      } else {
        inputProps.min = check.value;
      }
    }
    if (check.kind === "max") {
      if (type === "ZodString") {
        inputProps.maxLength = check.value;
      } else {
        inputProps.max = check.value;
      }
    }
  }

  return inputProps;
}

/**
 * Sort the fields by order.
 * If no order is set, the field will be sorted based on the order in the schema.
 */

export function sortFieldsByOrder<SchemaType extends z.ZodObject<any, any>>(
  fieldConfig: FieldConfig<z.infer<SchemaType>> | undefined,
  keys: string[]
) {
  const sortedFields = keys.sort((a, b) => {
    const fieldA: number = (fieldConfig?.[a]?.order as number) ?? 0;
    const fieldB = (fieldConfig?.[b]?.order as number) ?? 0;
    return fieldA - fieldB;
  });

  return sortedFields;
}

export const FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

/**
 * Create a super-refinement function to store the field config.
 *
 * @param config The field configuration.
 */
export function fieldConfig(config: FieldConfigItem): SuperRefineFunction {
  const refinementFunction: SuperRefineFunction = () => {
    // Do nothing.
  };

  // @ts-expect-error This is a symbol and not a real value.
  refinementFunction[FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}

export function getFieldConfigInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodEffects<
    z.ZodNumber | z.ZodString
  >;

  if (typedSchema._def.typeName === "ZodEffects") {
    const effect = typedSchema._def.effect as RefinementEffect<any>;
    const refinementFunction = effect.refinement;

    if (FIELD_CONFIG_SYMBOL in refinementFunction) {
      return refinementFunction[FIELD_CONFIG_SYMBOL];
    }
  }

  if ("innerType" in typedSchema._def) {
    return getFieldConfigInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny
    );
  }
  if ("schema" in typedSchema._def) {
    return getFieldConfigInZodStack(
      (typedSchema._def as any).schema as z.ZodAny
    );
  }

  return undefined;
}

export function extractRefinedFieldConfig<
  SchemaType extends ZodObjectOrWrapped,
  Schema extends z.ZodObject<any, any>,
>(formSchema: Schema, fieldConfig: FieldConfig<SchemaType> = {}) {
  const baseConfig = fieldConfig;

  if (!formSchema) return baseConfig;
  const { shape } = formSchema;
  if (!shape) return baseConfig;

  for (const keyRaw of Object.keys(shape)) {
    const key = keyRaw as keyof SchemaType;
    const item = shape[key] as z.ZodAny;

    if (getBaseType(item) === "ZodObject") {
      const objectConfig = extractRefinedFieldConfig(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>,
        fieldConfig?.[key] as FieldConfig<z.infer<Schema>>
      );

      baseConfig[key] = {
        ...(baseConfig[key] as any),
        ...objectConfig,
      };
    } else {
      const fieldConfigItem = getFieldConfigInZodStack(item);
      if (fieldConfigItem) {
        baseConfig[key] = {
          ...baseConfig[key],
          ...fieldConfigItem,
        };
      }
    }
  }

  return baseConfig;
}
