import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { FieldWrapperProps } from "@autoform/react";

const DISABLED_LABELS = ["boolean", "date", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  field,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={!!error}
      required={field.required}
    >
      {isDisabled ? null : <InputLabel htmlFor={id}>{label}</InputLabel>}
      {children}
      {field.fieldConfig?.description && (
        <FormHelperText>{field.fieldConfig.description}</FormHelperText>
      )}
    </FormControl>
  );
};
