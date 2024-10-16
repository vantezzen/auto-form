import React from "react";
import { AutoFormFieldProps } from "./types";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";
import { getLabel } from "@autoform/core";

export const ObjectField: React.FC<AutoFormFieldProps> = ({ field, path }) => {
  const { uiComponents, setFieldValue, getError, getFieldValue } =
    useAutoForm();

  const fullPath = path || [];

  return (
    <uiComponents.ObjectWrapper label={getLabel(field)} field={field}>
      {Object.entries(field.schema!).map(([key, subField]) => {
        const fullKey = [...fullPath, subField.key];
        const fullKeyString = fullKey.join(".");

        return (
          <AutoFormField
            label={getLabel(subField)}
            key={fullKeyString}
            field={subField}
            value={getFieldValue(fullKeyString)}
            onChange={(newValue) => {
              setFieldValue(fullKeyString, newValue);
            }}
            error={getError(fullKeyString)}
            id={fullKeyString}
            path={fullKey}
          />
        );
      })}
    </uiComponents.ObjectWrapper>
  );
};
