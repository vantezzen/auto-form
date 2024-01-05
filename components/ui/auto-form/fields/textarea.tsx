import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormTextarea({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  return (
    <FormItem className="flex w-full flex-row items-center justify-between space-x-2">
      {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
      <FormControl>
        <Textarea
          className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
          {...fieldPropsWithoutShowLabel}
        />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
