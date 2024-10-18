import { AutoForm, FieldTypes } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";
import { yupSchemaProvider } from "./utils";

function Basics() {
  return (
    <AutoForm
      schema={yupSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
}

export default Basics;
