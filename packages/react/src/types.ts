import { ReactNode } from "react";
import {
  ParsedField,
  ParsedSchema,
  Renderable,
  SchemaProvider,
} from "@autoform/core";

export interface AutoFormProps<T> {
  schema: SchemaProvider<T>;
  onSubmit?: (
    values: T,
    extra: {
      setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
      clearForm: () => void;
    }
  ) => void | Promise<void>;
  defaultValues?: Partial<T>;
  children?: ReactNode;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
  withSubmit?: boolean;

  setValues?: React.Dispatch<React.SetStateAction<Partial<T>>>;
  values?: Partial<T>;
}

export interface AutoFormUIComponents {
  Form: React.ComponentType<{
    onSubmit: (e: React.FormEvent) => void;
    children: ReactNode;
  }>;
  FieldWrapper: React.ComponentType<FieldWrapperProps>;
  ErrorMessage: React.ComponentType<{ error: string }>;
  SubmitButton: React.ComponentType<{ children: ReactNode }>;
  ObjectWrapper: React.ComponentType<ObjectWrapperProps>;
  ArrayWrapper: React.ComponentType<ArrayWrapperProps>;
  ArrayElementWrapper: React.ComponentType<ArrayElementWrapperProps>;
}

export interface AutoFormFieldComponents {
  [key: string]: React.ComponentType<AutoFormFieldProps>;
}

export interface FieldWrapperProps {
  label: Renderable<ReactNode>;
  error?: Renderable<ReactNode>;
  children: ReactNode;
  id: string;
  field: ParsedField;
}

export interface ArrayWrapperProps {
  label: Renderable<ReactNode>;
  children: ReactNode;
  field: ParsedField;
  onAddItem: () => void;
}

export interface ArrayElementWrapperProps {
  children: ReactNode;
  onRemove: () => void;
  index: number;
}

export interface ObjectWrapperProps {
  label: Renderable<ReactNode>;
  children: ReactNode;
  field: ParsedField;
}

export interface AutoFormFieldProps {
  label: Renderable<ReactNode>;
  field: ParsedField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  id: string;
  path: string[];
}

export interface AutoFormContextType {
  schema: ParsedSchema;
  values: Record<string, any>;
  errors: Record<string, string>;
  getFieldValue: (name: string) => any;
  setFieldValue: (name: string, value: any) => void;
  getError: (name: string) => string | undefined;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
}
