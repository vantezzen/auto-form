import { AutoForm, fieldConfig } from "@autoform/mantine";
import { zodSchemaProvider } from "./utils";

function Mantine() {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
}

export default Mantine;
