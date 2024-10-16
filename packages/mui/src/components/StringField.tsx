import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  id,
}) => (
  <Input
    id={id}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    error={!!error}
    fullWidth
    {...field.fieldConfig?.inputProps}
  />
);
