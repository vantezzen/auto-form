import React from "react";
import { Box } from "@mantine/core";

export const Form: React.FC<{
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}> = ({ onSubmit, children }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      {children}
    </Box>
  );
};
