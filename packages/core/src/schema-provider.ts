import { ParsedSchema, SchemaValidation } from "./types";

/**
 * Schema provider interface
 *
 * Schema providers are responsible for converting schemas from different libraries into
 * a format that AutoForm can use.
 * They also handle validating the form value and returning error messages in a consistent format.
 */
export interface SchemaProvider<T = any> {
  /**
   * Parse the schema into a format that AutoForm can use.
   */
  parseSchema(): ParsedSchema;

  /**
   * Validate the form values against the schema.
   * This returns either the transformed result (e.g. with date coersion) or an array of errors.
   *
   * @param values - Form values to validate
   */
  validateSchema(values: T): SchemaValidation;

  /**
   * Get the default values for the fields.
   * This is used to populate the form with initial values.
   *
   * @returns Default values for the form
   */
  getDefaultValues(): Record<string, any>;
}
