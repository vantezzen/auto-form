import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  label,
}) => (
  <Checkbox
    checked={!!value}
    onChange={(e) => onChange(e.currentTarget.checked)}
    label={label}
    required={field.required}
    description={field.description}
    {...field.fieldConfig?.inputProps}
  />
);
