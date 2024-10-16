import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ObjectWrapperProps } from "@autoform/react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{label}</Typography>
      {children}
    </Box>
  );
};
