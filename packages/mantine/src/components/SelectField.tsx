import React from "react";
import { Select } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  label,
}) => (
  <Select
    value={value || ""}
    onChange={(val) => onChange(val)}
    error={!!error}
    label={label}
    data={(field.options || []).map(([key, label]) => ({ value: key, label }))}
    required={field.required}
    description={field.description}
    {...field.fieldConfig?.inputProps}
  />
);
