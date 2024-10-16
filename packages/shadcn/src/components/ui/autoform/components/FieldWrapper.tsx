import React from "react";
import { Label } from "@/components/ui/label";
import { FieldWrapperProps } from "@autoform/react";

const DISABLED_LABELS = ["boolean", "date", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  field,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <div className="space-y-2">
      {!isDisabled && (
        <Label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {children}
      {field.fieldConfig?.description && (
        <p className="text-sm text-muted-foreground">
          {field.fieldConfig.description}
        </p>
      )}
    </div>
  );
};
