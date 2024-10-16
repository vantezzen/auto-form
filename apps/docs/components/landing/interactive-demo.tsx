import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { AutoForm } from "@autoform/mui";
import { SchemaProvider } from "@autoform/core";
import { ZodProvider } from "@autoform/zod";

const defaultCode = `z.object({
  name: z.string(),
  age: z.number(),
  isHuman: z.boolean(),
})`;
const globalZod = z;

function InteractiveDemo() {
  const [code, setCode] = React.useState(defaultCode);
  const [schema, setSchema] = React.useState<z.ZodObject<any, any> | null>(
    z.object({
      name: z.string(),
      age: z.number(),
      isHuman: z.boolean(),
    }),
  );
  const [schemaProvider, setSchemaProvider] = React.useState<SchemaProvider>(
    () => new ZodProvider(schema),
  );
  const [data, setData] = useState("");

  useEffect(() => {
    try {
      const z = globalZod;
      const parsedSchema = eval(code);
      setSchema(parsedSchema);
      setSchemaProvider(new ZodProvider(parsedSchema));
    } catch (error) {
      console.error(error);
    }
  }, [code]);

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <div className="bg-white rounded-lg p-6">
        <Editor
          height="600px"
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <AutoForm
          schema={schemaProvider}
          onSubmit={(data) => setData(JSON.stringify(data, null, 2))}
          withSubmit
        />

        {data && (
          <pre className="bg-gray-100 p-4 rounded-lg text-sm mt-4">{data}</pre>
        )}
      </div>
    </div>
  );
}

export default InteractiveDemo;
