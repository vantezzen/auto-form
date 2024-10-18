import * as yup from "yup";

export type YupObjectOrWrapped = yup.ObjectSchema<any>;
export type YupField = yup.Schema<any>;

export type YupEnumSchema = {
  _whitelist: Set<string>;
};
