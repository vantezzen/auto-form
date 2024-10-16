import React from "react";
import { Text } from "@mantine/core";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <Text c="red" size="sm">
    {error}
  </Text>
);
