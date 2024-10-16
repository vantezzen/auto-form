import React from "react";
import Box from "@mui/material/Box";

export const Form: React.FC<{
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}> = ({ onSubmit, children }) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
      {children}
    </Box>
  );
};
