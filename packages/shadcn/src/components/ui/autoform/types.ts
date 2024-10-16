import { AutoFormProps as BaseAutoFormProps } from "@autoform/react";

export interface AutoFormProps<T>
  extends Omit<BaseAutoFormProps<T>, "uiComponents" | "formComponents"> {}
