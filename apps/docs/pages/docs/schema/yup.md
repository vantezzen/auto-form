# Yup

Basic usage:

```tsx
"use client";
import { YupProvider, fieldConfig } from "@autoform/yup";
import { object, string, number, date, InferType, array, mixed } from "yup";

// Define your form schema using zod

const yupFormSchema = object({
  name: string().required().label("Your Name").default("John Doe"),

  age: number().required().positive().integer(),

  email: string()
    .email()
    // You can use fieldConfig to set additional configuration for a field
    .transform(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: {
          type: "email",
        },
      })
    ),
  website: string().url().nullable(),

  // You can use arrays and sub-objects
  guests: array().of(
    object({
      name: string().required(),
    })
  ),

  // You can use enums
  sport: mixed().oneOf(Object.values(Sports)),
});

export const yupSchemaProvider = new YupProvider(yupFormSchema);

function App() {
  return (
    <AutoForm
      schema={yupSchemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

### Yup configuration

#### Validations

Your form schema can use any of yup's validation methods.

#### Label

You can use the `label` method to set a label and description for each field. If no label is set, the field name will be used and un-camel-cased.

```tsx
const formSchema = object({
  username: string().label("Your username"),
  someValue: string(), // Will be "Some Value"
});
```

#### Default values

You can set a default value for a field using the `default` method.

```tsx
const formSchema = object({
  favouriteNumber: number().default(5),
});
```

If you want to set default value of date, convert it to Date first using `new Date(val)`.

#### Select/Enums

You can use `mixed().oneOf` to create a select field.

```tsx
enum BreadTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  White = "White bread",
  Brown = "Brown bread",
  Wholegrain = "Wholegrain bread",
  Other,
}
const formSchema = object({
  breadType: mixed().oneOf(Object.values(BreadTypes)),
});
```

#### Arrays

AutoForm supports arrays _of objects_. Because inferring things like field labels from arrays of strings/numbers/etc. is difficult, only objects are supported.

```tsx
const formSchema = object({
  guestListName: string(),
  invitedGuests: array(
    // Define the fields for each item
    object({
      name: string(),
      age: number(),
    })
  )
    // Optionally set a custom label - otherwise this will be inferred from the field name
    .label("Guests invited to the party"),
});
```

Arrays are not supported as the root element of the form schema.

You also can set default value of an array using .default(), but please make sure the array element has same structure with the schema.

#### Sub-objects

You may use sub-objects to group fields together. These will be rendered with their own title.

```tsx
const formSchema = object({
  guestDetails: object({
    name: string(),
    age: number(),
  }),
});
```

#### Field configuration

You can use the `fieldConfig` function to set additional configuration for how a field should be rendered. This function is independent of the UI library you use so you can provide the FieldTypes that are supported by your UI library.

It's recommended that you create your own fieldConfig function that uses the base fieldConfig function from `@autoform/zod` and adds your own customizations:

```tsx
import { fieldConfig as baseFieldConfig } from "@autoform/yup";
import { FieldTypes } from "@autoform/mui";

export const fieldConfig = (config: FieldConfig<React.ReactNode, FieldTypes>) =>
  baseFieldConfig<React.ReactNode, FieldTypes>(config);
```
