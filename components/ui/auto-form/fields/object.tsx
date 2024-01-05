import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from "../config";
import { FieldConfig, FieldConfigItem } from "../types";
import {
  beautifyObjectName,
  getBaseSchema,
  getBaseType,
  zodToHtmlInputProps,
} from "../utils";
import AutoFormArray from "./array";

function DefaultParent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function AutoFormObject<
  SchemaType extends z.ZodObject<any, any>,
>({
  schema,
  form,
  fieldConfig,
  path = [],
  dependencies = {},
}: {
  schema: SchemaType | z.ZodEffects<SchemaType>;
  form: ReturnType<typeof useForm>;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  path?: string[];
  dependencies?: Record<
    string,
    {
      field: string;
      type: "setOptions" | "disabled" | "required" | "hidden";
      condition: {
        value: any;
      };
      options?: any;
    }
  >;
}) {
  const { watch } = useFormContext(); // Use useFormContext to access the watch function

  if (!schema) {
    return null;
  }
  const { shape } = getBaseSchema<SchemaType>(schema) || {};

  if (!shape) {
    return null;
  }

  const handleIfZodNumber = (item: z.ZodAny) => {
    const isZodNumber = (item as any)._def.typeName === "ZodNumber";
    const isInnerZodNumber =
      (item._def as any).innerType?._def?.typeName === "ZodNumber";

    if (isZodNumber) {
      (item as any)._def.coerce = true;
    } else if (isInnerZodNumber) {
      (item._def as any).innerType._def.coerce = true;
    }

    return item;
  };

  return (
    <Accordion type="multiple" className="space-y-5 border-none">
      {Object.keys(shape).map((name) => {
        let item = shape[name] as z.ZodAny;
        item = handleIfZodNumber(item) as z.ZodAny;
        const zodBaseType = getBaseType(item);
        const itemName = item._def.description ?? beautifyObjectName(name);
        const key = [...path, name].join(".");
        let isHidden = false;
        const dependency = dependencies[name];
        let isDisabled = false;
        if (dependency) {
          const watchedValue = watch(dependency.field);
          if (dependency.condition.value == watchedValue) {
            switch (dependency.type) {
              case "setOptions":
                item = z.enum(dependency.options) as any;
                break;
              case "disabled":
                isDisabled = dependency.condition.value == watchedValue;
                break;
              case "required":
                switch (zodBaseType) {
                  case "ZodString":
                    item = z.string().min(1) as any;
                    break;
                  case "ZodNumber":
                    item = z.number().min(1) as any;
                    break;
                  case "ZodBoolean":
                    item = z.boolean() as any;
                    break;
                  case "ZodArray":
                    item = z.array(z.any()).min(1) as any;
                    break;
                  default:
                    break;
                }
                break;
              case "hidden":
                isHidden = true;
                break;
            }
          }
        }

        const dependencyZodField = shape[dependency?.field ?? ""];

        // if isHidden is true or default value of dependency field is as the condition value, then hide the field
        if (
          isHidden ||
          (dependencyZodField &&
            dependencyZodField._def.defaultValue ===
              dependency?.condition.value)
        ) {
          return null;
        }

        if (zodBaseType === "ZodObject") {
          return (
            <AccordionItem value={name} key={key} className="border-none">
              <AccordionTrigger>{itemName}</AccordionTrigger>
              <AccordionContent className="p-2">
                <AutoFormObject
                  schema={item as unknown as z.ZodObject<any, any>}
                  form={form}
                  fieldConfig={
                    (fieldConfig?.[name] ?? {}) as FieldConfig<
                      z.infer<typeof item>
                    >
                  }
                  path={[...path, name]}
                />
              </AccordionContent>
            </AccordionItem>
          );
        }
        if (zodBaseType === "ZodArray") {
          return (
            <AutoFormArray
              key={key}
              name={name}
              item={item as unknown as z.ZodArray<any>}
              form={form}
              fieldConfig={fieldConfig?.[name] ?? {}}
              path={[...path, name]}
            />
          );
        }

        const fieldConfigItem: FieldConfigItem = fieldConfig?.[name] ?? {};
        const zodInputProps = zodToHtmlInputProps(item);
        const isRequired =
          zodInputProps.required ||
          fieldConfigItem.inputProps?.required ||
          false;

        return (
          <FormField
            control={form.control}
            name={key}
            key={key}
            render={({ field }) => {
              const inputType =
                fieldConfigItem.fieldType ??
                DEFAULT_ZOD_HANDLERS[zodBaseType] ??
                "fallback";

              const InputComponent =
                typeof inputType === "function"
                  ? inputType
                  : INPUT_COMPONENTS[inputType];

              const ParentElement =
                fieldConfigItem.renderParent ?? DefaultParent;

              const defaultValue = fieldConfigItem.inputProps?.defaultValue;
              const value = field.value ?? defaultValue ?? "";

              const fieldProps = {
                ...zodToHtmlInputProps(item),
                ...field,
                ...fieldConfigItem.inputProps,
                disabled: isDisabled,
                ref: undefined,
                value: value,
              };

              if (InputComponent === undefined) {
                return <></>;
              }

              return (
                <ParentElement key={`${key}.parent`}>
                  <InputComponent
                    zodInputProps={zodInputProps}
                    field={field}
                    fieldConfigItem={fieldConfigItem}
                    label={itemName}
                    isRequired={isRequired}
                    zodItem={item}
                    fieldProps={fieldProps}
                    className={fieldProps.className}
                  />
                </ParentElement>
              );
            }}
          />
        );
      })}
    </Accordion>
  );
}
