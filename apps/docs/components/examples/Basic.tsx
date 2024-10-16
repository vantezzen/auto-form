import { AutoForm } from "@autoform/mui";
import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const userSchema = z.object({
  name: z.string(),
  birthday: z.coerce.date(),
  email: z.string().email(),
});

const schemaProvider = new ZodProvider(userSchema);

export default function BasicExample() {
  const [data, setData] = useState("");

  return (
    <div className="mx-auto max-w-md m-6 grid gap-3" suppressHydrationWarning>
      <Card>
        <CardContent>
          <AutoForm
            schema={schemaProvider}
            onSubmit={(data) => {
              setData(JSON.stringify(data, null, 2));
            }}
            withSubmit
          />
        </CardContent>
      </Card>

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Form Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{data}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
