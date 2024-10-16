import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => (
  <Input
    type="number"
    value={value || ""}
    onChange={(e) => onChange(Number(e.target.value))}
    error={!!error}
    fullWidth
    {...field.fieldConfig?.inputProps}
  />
);
