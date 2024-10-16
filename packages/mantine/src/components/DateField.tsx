import React from "react";
import { DateInput } from "@mantine/dates";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  label,
}) => (
  <DateInput
    value={value ? new Date(value) : null}
    onChange={(date) => onChange(date)}
    error={!!error}
    label={label}
    required={field.required}
    description={field.description}
    {...field.fieldConfig?.inputProps}
  />
);
