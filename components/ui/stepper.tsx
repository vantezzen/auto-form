import { cn } from "@/lib/utils";
import React from "react";

interface StepperProps {
  steps: number;
  currentStep: number;
  mode?: "dots" | "text";
  className?: any;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  mode,
  className,
}) => {
  if (mode === "dots") {
    return (
      <div className="flex w-full items-center justify-center">
        {Array.from({ length: steps }, (_, index) => (
          <div key={index} className="flex w-full items-center ">
            <div
              className={cn(
                "h-8 w-8 flex items-center justify-center rounded-full",
                index <= currentStep ? "bg-zinc-600 text-white" : "bg-gray-200",
                className
              )}
            >
              {index + 1}
            </div>
            {index < steps - 1 && (
              <div
                className={cn(
                  "mx-auto m-1 rounded-2xl h-1 grow border-2  border-gray-200",
                  index < currentStep ? "border-zinc-400" : ""
                )}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-start font-medium text-[#7b7b7b]">
      Section {currentStep + 1} / {steps}
    </div>
  );
};

export default Stepper;
