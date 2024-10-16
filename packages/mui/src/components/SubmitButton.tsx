import React from "react";
import Button from "@mui/material/Button";

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
    {children}
  </Button>
);
