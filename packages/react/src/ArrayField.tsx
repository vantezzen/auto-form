import React from "react";
import { AutoFormFieldProps } from "./types";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";
import { getLabel } from "@autoform/core";

export const ArrayField: React.FC<AutoFormFieldProps> = ({ field, path }) => {
  const { uiComponents, setFieldValue, getError, getFieldValue } =
    useAutoForm();

  const fullPath = path || [];
  const fieldPathString = fullPath.join(".");
  const value = getFieldValue(fieldPathString) || [];

  const handleAddItem = () => {
    const subFieldType = field.schema?.[0]?.type;
    let defaultValue: any;
    if (subFieldType === "object") {
      defaultValue = {};
    } else if (subFieldType === "array") {
      defaultValue = [];
    } else {
      defaultValue = null;
    }

    const newValue = [...value, defaultValue];
    setFieldValue(fieldPathString, newValue);
  };

  const handleRemoveItem = (index: number) => {
    const newValue = value.filter((_: any, i: number) => i !== index);
    setFieldValue(fieldPathString, newValue);
  };

  return (
    <uiComponents.ArrayWrapper
      label={getLabel(field)}
      field={field}
      onAddItem={handleAddItem}
    >
      {value.map((item: any, index: number) => (
        <uiComponents.ArrayElementWrapper
          key={index}
          onRemove={() => handleRemoveItem(index)}
          index={index}
        >
          {field.schema![0] && (
            <AutoFormField
              field={field.schema![0]}
              value={item}
              onChange={(newValue) => {
                const newArray = [...value];
                newArray[index] = newValue;
                setFieldValue(fieldPathString, newArray);
              }}
              error={getError(`${fieldPathString}.${index}`)}
              id={`${fieldPathString}.${index}`}
              label={`${getLabel(field)} ${index + 1}`}
              path={[...fullPath, index.toString()]}
            />
          )}
        </uiComponents.ArrayElementWrapper>
      ))}
    </uiComponents.ArrayWrapper>
  );
};
