import { AutoForm, fieldConfig } from "@autoform/mantine";
import { schemaProvider } from "./utils";

function Mantine() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
}

export default Mantine;
