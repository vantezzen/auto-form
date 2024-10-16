import { ParsedField } from "./types";

export function getLabel(field: ParsedField) {
  return (
    field.fieldConfig?.label || field.description || beautifyLabel(field.key)
  );
}

function beautifyLabel(label: string) {
  let output = label.replace(/([A-Z])/g, " $1");
  output = output.charAt(0).toUpperCase() + output.slice(1);

  // Never return a number for the label
  // This primarily important for array fields so we don't get "0" as a label
  if (!isNaN(Number(output))) {
    return "";
  }
  return output;
}
