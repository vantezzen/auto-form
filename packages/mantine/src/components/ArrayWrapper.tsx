import React from "react";
import { Box, Title, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  children,
  onAddItem,
}) => {
  return (
    <Box mt="md">
      <Title order={4}>{label}</Title>
      {children}
      <Button onClick={onAddItem} mt="sm">
        <IconPlus size={14} />
      </Button>
    </Box>
  );
};
