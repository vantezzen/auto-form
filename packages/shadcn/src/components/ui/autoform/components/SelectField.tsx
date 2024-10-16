import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  id,
}) => (
  <Select value={value || ""} onValueChange={onChange}>
    <SelectTrigger id={id} className={error ? "border-destructive" : ""}>
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      {(field.options || []).map(([key, label]) => (
        <SelectItem key={key} value={key}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
