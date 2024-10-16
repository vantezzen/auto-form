import { AutoFormProps as BaseAutoFormProps } from "@autoform/react";
import { ThemeProvider } from "@mui/material/styles";

export interface AutoFormProps<T>
  extends Omit<BaseAutoFormProps<T>, "uiComponents" | "formComponents"> {
  theme?: Parameters<typeof ThemeProvider>[0]["theme"];
}
