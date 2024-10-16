import { AutoFormProps as BaseAutoFormProps } from "@autoform/react";
import { MantineProvider } from "@mantine/core";

export interface AutoFormProps<T>
  extends Omit<BaseAutoFormProps<T>, "uiComponents" | "formComponents"> {
  theme?: Parameters<typeof MantineProvider>[0]["theme"];
}
