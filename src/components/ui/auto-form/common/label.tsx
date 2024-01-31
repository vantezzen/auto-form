import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";

function AutoFormLabel({
  label,
  isRequired,
  className,
}: {
  label: string;
  isRequired: boolean;
  className?: string;
}) {
  return (
    <>
      <FormLabel className={cn("w-[140px] space-y-0 mt-2", className)}>
        {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
    </>
  );
}

export default AutoFormLabel;
