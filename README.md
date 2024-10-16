# AutoForm

> Automatically render forms for your existing data schema.

---

> [!NOTE]
>
> **Work in Progress** AutoForm as a standalone package is still work in progress. If you want to help out, please check out the [GitHub repository](https://github.com/vantezzen/autoform) and add your own integrations!

Find the full documentation at [autoform.vantezzen.io](https://autoform.vantezzen.io).

---

> AutoForm is now a full library!

AutoForm quickly grew from a small component into a codebase larger than any shadcn component should be. To let AutoForm grow without bloating your shadcn/ui components, AutoForm is now a full library!

Don't worry, you can still use AutoForm with your shadcn components and expand it with your own components - but it now also supports integration into other UI libraries like MUI and Mantine and we plan on adding support for other schema libraries than zod too.

Check out the new [AutoForm documentation](https://autoform.vantezzen.io) for more information.

The new AutoForm does not have full feature-parity with the old AutoForm as we look into what features actually make sense and which once just bloat the experience. If you're missing a feature or have problems with the new library, feel free to write your feedback in the welcome post!

If you want to continue using the pure shadcn/ui component, you can find the old codebase at <https://github.com/vantezzen/auto-form/tree/pure-shadcn> - but write us what keeps you from migrating to the new library!

---

What is AutoForm? Let's say you have a zod schema that you already use for your backend:

```ts
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  email: z.string().email(),
});
```

With AutoForm, you can automatically render a form for this schema:

```tsx
import { AutoForm } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";

function MyForm() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

AutoForm itself is agnostic to the schema library, rendering library and UI library you use, but it comes with a set of official packages that make it easy to use with popular libraries like Zod, React, Material UI, etc.

## When to use AutoForm?

AutoForm is mostly meant as a drop-in form builder for your internal and low-priority forms with existing schemas. For example, if you already have schemas for your API and want to create a simple admin panel to edit user profiles, simply pass the schema to AutoForm and you're done.

As forms almost always grow more complex, AutoForm gives you options to customize how forms are rendered (e.g. using the `fieldConfig` options) and gives you escape hatches to customize the form even further.

However, AutoForm does not aim to be a full-featured form builder. It does not aim to support every edge case in your schema or allow building complex, multi-page forms. If you need more customization, feel free to customize AutoForm's renderer in your project or use more powerful form builders like [Formik](https://formik.org/) - though those require more specialized configuration instead of simple drop-in support for your zod schema. For an example on how AutoForm can be extended for more powerful, YAML-based, multi-page forms, see [AutoForm YAML](https://github.com/roeyazroel/auto-form).

## shadcn/ui component

AutoForm started out as a [shadcn/ui component](https://github.com/vantezzen/auto-form) but grew so large I decided it's best to split it into a package instead.

`@autoform/react` does currently not have full feature-parity with the shadcn/ui component, but it's getting there. If you want to use the shadcn/ui component, you can still use it as a standalone package.

## Development

AutoForm uses a TurboRepo monorepo setup. To get started, run:

```bash
npm install
npm run dev
```

This will start the development server for the documentation website and the AutoForm package itself.

For releases, AutoForm uses changesets. To create a new release, run:

```bash
npm run build
npx changeset
```

This will guide you through creating a new changeset. To publish the changeset, run:

```bash
npx changeset version
npx changeset publish
```

## License

All packages in the AutoForm monorepo are licensed under the MIT license.
