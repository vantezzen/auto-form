import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrayElementWrapperProps } from "@autoform/react";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
  index,
}) => {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 1,
        position: "relative",
      }}
    >
      <IconButton
        onClick={onRemove}
        sx={{ position: "absolute", top: 8, right: 8 }}
        size="small"
      >
        <DeleteIcon />
      </IconButton>
      {children}
    </Box>
  );
};
