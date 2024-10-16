import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  label,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        {...field.fieldConfig?.inputProps}
      />
    }
    label={label}
  />
);
