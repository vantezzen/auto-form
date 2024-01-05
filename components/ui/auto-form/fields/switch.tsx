import { FormControl, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormSwitch({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex flex-row  items-center space-x-2">
      <FormItem className="flex w-full flex-row items-center justify-start">
        <AutoFormLabel label={label} isRequired={isRequired} />
        <div className="flex h-10 w-full flex-row items-center space-x-1 ">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...fieldProps}
            />
          </FormControl>
        </div>
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </div>
  );
}
