import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormDate({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div className="flex flex-row  items-center space-x-2 ">
      <FormItem className="flex w-full flex-col">
        <div className=" flex flex-row items-center justify-between space-x-2">
          <AutoFormLabel label={label} isRequired={isRequired} />
          <FormControl>
            <DatePicker
              date={field.value}
              setDate={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        </div>
        <FormMessage className="ml-[140px]" />
      </FormItem>
    </div>
  );
}
