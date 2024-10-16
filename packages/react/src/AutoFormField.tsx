import React from "react";
import { useAutoForm } from "./context";
import { AutoFormFieldProps } from "./types";
import { getLabel } from "@autoform/core";
import { ObjectField } from "./ObjectField";
import { ArrayField } from "./ArrayField";

export function AutoFormField({ field, path }: AutoFormFieldProps) {
  const {
    getFieldValue,
    setFieldValue,
    getError,
    formComponents,
    uiComponents,
  } = useAutoForm();

  const fieldPathString = path.join(".");

  const value = getFieldValue(fieldPathString);
  const error = getError(fieldPathString);

  const onChange = (newValue: any) => {
    setFieldValue(fieldPathString, newValue);
  };

  let FieldComponent: React.ComponentType<AutoFormFieldProps> = () => (
    <uiComponents.ErrorMessage
      error={`[AutoForm Configuration Error] No component found for type "${field.type}" nor a fallback`}
    />
  );

  if (field.type === "array") {
    FieldComponent = ArrayField;
  } else if (field.type === "object") {
    FieldComponent = ObjectField;
  } else if (field.type in formComponents) {
    FieldComponent = formComponents[field.type as keyof typeof formComponents]!;
  } else if ("fallback" in formComponents) {
    FieldComponent = formComponents.fallback;
  }

  return (
    <uiComponents.FieldWrapper
      label={getLabel(field)}
      error={error}
      id={field.key}
      field={field}
    >
      <FieldComponent
        field={field}
        value={value}
        onChange={onChange}
        error={error}
        id={field.key}
        label={getLabel(field)}
        path={path}
      />
      {error && <uiComponents.ErrorMessage error={error} />}
    </uiComponents.FieldWrapper>
  );
}
