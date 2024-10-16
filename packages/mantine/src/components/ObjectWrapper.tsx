import React from "react";
import { Box, Title } from "@mantine/core";
import { ObjectWrapperProps } from "@autoform/react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Box mt="md">
      <Title order={4}>{label}</Title>
      {children}
    </Box>
  );
};
