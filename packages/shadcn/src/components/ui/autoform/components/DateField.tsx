import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  id,
}) => (
  <Input
    id={id}
    type="date"
    value={value ? new Date(value).toISOString().split("T")[0] : ""}
    onChange={(e) => onChange(new Date(e.target.value))}
    className={error ? "border-destructive" : ""}
    {...field.fieldConfig?.inputProps}
  />
);
