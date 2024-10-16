import React from "react";
import { NumberInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  label,
}) => (
  <NumberInput
    value={value || ""}
    onChange={(val) => onChange(val)}
    error={!!error}
    label={label}
    required={field.required}
    description={field.description}
    {...field.fieldConfig?.inputProps}
  />
);
