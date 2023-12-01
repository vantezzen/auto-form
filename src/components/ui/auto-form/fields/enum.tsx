import {
  FormControl,
  FormDescription,
  FormItem,  
  FormLabel,
  FormMessage,
} from "../../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import * as z from "zod";

import { AutoFormInputComponentProps } from "../types";
import { getBaseSchema } from "../utils";

export default function AutoFormEnum({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
}: AutoFormInputComponentProps) {
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map((value) => [value, value]);
  }

  return (
    <FormItem>
      <FormLabel>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          value={field.value}
        >
          <SelectTrigger>
            <SelectValue
              className="w-full"
              placeholder={
                fieldConfigItem.inputProps?.placeholder ?? "Select an option"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {values.map(([value, label]) => (
              <SelectItem value={label} key={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {fieldConfigItem.description && (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
