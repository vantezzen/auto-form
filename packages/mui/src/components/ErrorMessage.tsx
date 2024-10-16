import React from "react";
import FormHelperText from "@mui/material/FormHelperText";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <FormHelperText error>{error}</FormHelperText>
);
