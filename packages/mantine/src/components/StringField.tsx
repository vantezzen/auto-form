import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  label,
  id,
}) => {
  return (
    <TextInput
      id={id}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      label={label}
      required={field.required}
      description={field.description}
      {...field.fieldConfig?.inputProps}
    />
  );
};
