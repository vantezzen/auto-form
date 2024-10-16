import React, { useState } from "react";
import {
  parseSchema,
  validateSchema,
  getDefaultValues,
  getLabel,
} from "@autoform/core";
import { AutoFormProps } from "./types";
import { AutoFormProvider } from "./context";
import { AutoFormField } from "./AutoFormField";

export function AutoForm<T extends Record<string, any>>({
  schema,
  onSubmit = () => {},
  defaultValues,
  children,
  uiComponents,
  formComponents,
  withSubmit = false,

  setValues: externalSetValues,
  values: externalValues,
}: AutoFormProps<T>) {
  const parsedSchema = parseSchema(schema);
  const [internalValues, internalSetValues] = useState<Partial<T>>(() => ({
    ...(getDefaultValues(schema) as T),
    ...defaultValues,
  }));

  const values = externalValues ?? internalValues;
  const setValues = externalSetValues ?? internalSetValues;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFieldValue = (name: string) => {
    const keys = name.split(".");
    let current = values as any;
    for (const key of keys) {
      current = current[key];

      if (current === undefined) {
        return undefined;
      }
    }
    return current;
  };

  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop()!;
      let current = { ...prev } as any;
      const currentRoot = current;

      for (const key of keys) {
        if (current[key] === undefined) {
          current[key] = {};
        }
        current = current[key];
      }
      current[lastKey] = value;

      return currentRoot;
    });
  };

  const getError = (name: string) => {
    return errors[name];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationResult = validateSchema(schema, values);
    if (validationResult.success) {
      await onSubmit(validationResult.data, {
        setErrors,
        clearForm: () => {
          setValues(getDefaultValues(schema) as T);
        },
      });
    } else {
      const newErrors: Record<string, string> = {};
      validationResult.errors?.forEach((error) => {
        const path = error.path.join(".");
        newErrors[path] = error.message;

        // For some custom errors, zod adds the final element twice for some reason
        const correctedPath = error.path.slice(0, -1);
        if (correctedPath.length > 0) {
          newErrors[correctedPath.join(".")] = error.message;
        }
      });
      setErrors(newErrors);
    }
  };

  return (
    <AutoFormProvider
      value={{
        schema: parsedSchema,
        values,
        errors,
        getError,
        setFieldValue,
        getFieldValue,
        uiComponents,
        formComponents,
      }}
    >
      <uiComponents.Form onSubmit={handleSubmit}>
        {parsedSchema.fields.map((field) => (
          <AutoFormField
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(value) => setFieldValue(field.key, value)}
            id={field.key}
            label={getLabel(field)}
            path={[field.key]}
          />
        ))}
        {withSubmit && (
          <uiComponents.SubmitButton>Submit</uiComponents.SubmitButton>
        )}
        {children}
      </uiComponents.Form>
    </AutoFormProvider>
  );
}
