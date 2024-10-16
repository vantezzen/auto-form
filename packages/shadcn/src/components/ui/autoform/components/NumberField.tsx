import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  id,
}) => (
  <Input
    id={id}
    type="number"
    value={value || ""}
    onChange={(e) => onChange(Number(e.target.value))}
    className={error ? "border-destructive" : ""}
    {...field.fieldConfig?.inputProps}
  />
);
