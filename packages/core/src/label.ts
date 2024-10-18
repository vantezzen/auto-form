import { ParsedField } from "./types";

/**
 * Get the best label to use for a field.
 * This will use user-provided labels, descriptions from the schema, or the field key.
 *
 * @param field Parsed field
 * @returns Label for the field
 */
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

  // Ignore labels for arrays of non-objects
  if (output === "*") {
    return "";
  }

  return output;
}
