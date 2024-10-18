import * as yup from "yup";
import { YupObjectOrWrapped } from "./types";

export function validateSchema(schema: YupObjectOrWrapped, values: any) {
  try {
    schema.validateSync(values, { abortEarly: false });
    return { success: true, data: values } as const;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { success: false, errors: error.inner } as const;
    }
    throw error;
  }
}
