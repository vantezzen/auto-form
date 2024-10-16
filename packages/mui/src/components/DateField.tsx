import React from "react";
import TextField from "@mui/material/TextField";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  label,
}) => (
  <TextField
    type="date"
    value={value ? new Date(value).toISOString().split("T")[0] : ""}
    onChange={(e) => onChange(new Date(e.target.value))}
    error={!!error}
    fullWidth
    label={label}
    InputLabelProps={{ shrink: true }}
    {...field.fieldConfig?.inputProps}
  />
);
