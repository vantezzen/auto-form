import React from "react";
import { Button } from "@mantine/core";

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Button type="submit" mt="md">
    {children}
  </Button>
);
