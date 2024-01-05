"use client";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import Stepper from "@/components/ui/stepper";
import { jsonSchemaToZod } from "json-schema-to-zod";
import { useEffect, useState } from "react";
import Icon from "./ui/icon";

import { z } from "zod";
import AutoForm, { AutoFormSubmit } from "./ui/auto-form";
import { FieldConfig } from "./ui/auto-form/types";
import { ZodObjectOrWrapped } from "./ui/auto-form/utils";
import { Switch } from "./ui/switch";

const zodPlaceHolder = z.object({});
zodPlaceHolder.parse({});

interface StepSchema<SchemaType extends ZodObjectOrWrapped> {
  formSchema: any; // Replace with more specific type if possible
  label: string;
  stepIcon: string;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  dependencies?: {
    [key: string]: {
      field: string;
      type: "setOptions" | "disabled" | "required" | "hidden";
      condition: {
        value: any;
      };
      options?: any;
    };
  };
}

// Define the overall schema structure
export interface StepperSchema {
  steps: StepSchema<any>[];
}

function StepperWrapper({
  schema,
  onSubmit,
}: {
  schema: StepperSchema;
  onSubmit?: (values: any) => void;
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepData, setStepData] = useState<Record<number, any>>({});
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [stepperMode, setStepperMode] = useState<"dots" | "text">("text");
  useEffect(() => {
    if (schema) setTotalSteps(schema.steps.length);
  }, [schema]);

  const handleFormDataChange = (newData: any) => {
    setStepData({ ...stepData, [currentStep]: newData });
  };

  const nextStep = (currentFormData: any) => {
    handleFormDataChange(currentFormData);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === totalSteps - 1) {
      handleFormSubmit({ ...stepData, [currentStep]: currentFormData });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (finalData: any) => {
    // convert each step to object with step icon, label and data

    const finalDataArray = Object.entries(finalData).map(([key, value]) => ({
      stepIcon: schema.steps[parseInt(key)].stepIcon,
      label: schema.steps[parseInt(key)].label,
      data: value,
    }));

    onSubmit?.(finalDataArray);
  };

  if (schema && (!schema.steps || schema.steps.length === 0)) {
    return (
      <div>
        <p>There are no steps to display.</p>
      </div>
    );
  }

  const convertToZod = (schema: any) => {
    try {
      const zodSchemaFunction = new Function(
        "z",
        `return ${jsonSchemaToZod(schema)}`
      );
      return zodSchemaFunction(z);
    } catch (error: any) {
      return null;
    }
  };

  if (!schema) {
    return (
      <div>
        <p>There is no schema to display.</p>
      </div>
    );
  }

  const stepContent = schema.steps.map((step, index) => (
    <div key={index}>
      <div className="mb-20 flex flex-row items-center">
        <Icon name={step?.stepIcon} />
        <Label className="ml-2 text-[22px]">{step?.label}</Label>
      </div>
      <AutoForm
        values={stepData[index]}
        onSubmit={nextStep}
        formSchema={convertToZod(step?.formSchema)}
        fieldConfig={step?.fieldConfig ?? {}}
        dependencies={step?.dependencies ?? {}}
      >
        <div className="flex w-auto flex-row justify-between">
          <Button
            className="w-20"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <AutoFormSubmit className="w-20">
            {index === totalSteps - 1 ? "Submit" : "Next"}
          </AutoFormSubmit>
        </div>
      </AutoForm>
    </div>
  ));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-2">
        <Label htmlFor="stepper-mode">Stepper Mode</Label>
        <Switch
          id="stepper-mode"
          onClick={() => {
            setStepperMode(stepperMode === "dots" ? "text" : "dots");
          }}
        />
      </div>
      <Stepper
        steps={totalSteps}
        currentStep={currentStep}
        mode={stepperMode}
      />

      <div className="mt-4">{stepContent[currentStep]}</div>
    </div>
  );
}

export default StepperWrapper;
