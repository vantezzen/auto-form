import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  id,
}) => (
  <Input
    id={id}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    className={error ? "border-destructive" : ""}
    {...field.fieldConfig?.inputProps}
  />
);
