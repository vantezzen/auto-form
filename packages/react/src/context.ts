import { createContext, useContext } from "react";
import { AutoFormContextType } from "./types";

const AutoFormContext = createContext<AutoFormContextType | null>(null);

export const AutoFormProvider = AutoFormContext.Provider;

export function useAutoForm() {
  const context = useContext(AutoFormContext);
  if (!context) {
    throw new Error("useAutoForm must be used within an AutoFormProvider");
  }
  return context;
}
