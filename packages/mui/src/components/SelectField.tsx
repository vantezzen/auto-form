import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => (
  <Select
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    error={!!error}
    fullWidth
    {...field.fieldConfig?.inputProps}
  >
    {(field.options || []).map(([key, label]) => (
      <MenuItem key={key} value={label}>
        {label}
      </MenuItem>
    ))}
  </Select>
);
