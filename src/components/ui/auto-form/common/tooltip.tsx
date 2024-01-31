import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

function AutoFormTooltip({ fieldConfigItem }: { fieldConfigItem: any }) {
  return (
    <>
      {fieldConfigItem?.description && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle
                size={16}
                className="ml-[1px] text-gray-500  dark:text-white"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm text-gray-500 dark:text-white">
                {fieldConfigItem.description}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

export default AutoFormTooltip;
