# Customization

The customization of the components is done by providing a `fieldConfig` to your schema fields. This allows you to customize the rendering of the field, add additional props, and more.

With zod, you can use the `superRefine` method to add a `fieldConfig` to your schema field. This method is used to add additional validation and configuration to your field.

You should import `fieldConfig` from your AutoForm UI-specific package (e.g. `@autoform/mui`) so it will be type-safe for your specific UI. If you use a custom UI, you can import `fieldConfig` from `@autoform/react` or `@autoform/core`.

```tsx
import * as z from "zod";
import { fieldConfig } from "@autoform/mui"; // or your UI library

const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      label: "Username",
      inputProps: {
        placeholder: "Enter your username",
      },
    }),
  ),
  // ...
});
```

## Input props

You can use the `inputProps` property to pass props to the input component. You can use any props that the HTML component accepts.

```tsx
const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      inputProps: {
        type: "text",
        placeholder: "Username",
      },
    }),
  ),
});
// This will be rendered as:
<input type="text" placeholder="Username" /* ... */ />;
```

## Field type

By default, AutoForm will use the Zod type to determine which input component to use. You can override this by using the `fieldType` property.

```tsx
const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      fieldType: "textarea",
    }),
  ),
});
```

The list of available fields depends on the UI library you use - use the autocomplete in your IDE to see the available options.

## Description

You can use the `description` property to add a description below the field.

```tsx
const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      description:
        "Enter a unique username. This will be shown to other users.",
    }),
  ),
});
```

You can use JSX in the description.
