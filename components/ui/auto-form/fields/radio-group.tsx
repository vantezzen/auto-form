import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import { getBaseSchema } from "../utils";

export default function AutoFormRadioGroup({
  label,
  isRequired,
  field,
  zodItem,
  fieldProps,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def
    .values;

  let values: string[] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues).map((item) => item[0]);
  } else {
    values = baseValues;
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-row items-center justify-start">
        <AutoFormLabel label={label} isRequired={isRequired} />
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex h-10 w-full flex-row items-center space-x-1 rounded-md border p-2 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
            {...fieldProps}
          >
            {values?.map((value: any) => (
              <FormItem
                className="flex items-center space-x-3 space-y-0"
                key={value}
              >
                <FormControl>
                  <RadioGroupItem value={value} />
                </FormControl>
                <FormLabel className="font-normal">{value}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </div>
  );
}
