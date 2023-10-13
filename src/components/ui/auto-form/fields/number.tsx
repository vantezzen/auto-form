import { AutoFormInputComponentProps } from "../types";
import AutoFormInput from "./input";

export default function AutoFormNumber({
  fieldProps,
  ...props
}: AutoFormInputComponentProps) {
  return (
    <AutoFormInput
      fieldProps={{
        type: "number",
        ...fieldProps,
      }}
      {...props}
    />
  );
}
