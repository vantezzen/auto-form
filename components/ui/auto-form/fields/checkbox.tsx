import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
  className,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <FormItem className="flex w-full flex-row items-center justify-start">
        <FormLabel className="mt-3 w-[117px]">
          {label}
          {isRequired && <span className="text-destructive"> *</span>}
        </FormLabel>
        <FormControl>
          <Checkbox
            className={cn(
              "data-[state=checked]:bg-zinc-500 data-[state=checked]:text-white",
              className
            )}
            checked={field.value}
            onCheckedChange={field.onChange}
            {...fieldProps}
          />
        </FormControl>
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </div>
  );
}
