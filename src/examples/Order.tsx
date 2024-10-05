import { Input } from "@/components/ui/input";
import { useState } from "react";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string(),
  age: z.number(),
  address: z.string(),
});

function Order() {
  const [fieldConfig, setFieldConfig] = useState<{
    [key: string]: { order: number };
  }>({
    name: { order: 0 },
    age: { order: 0 },
    address: { order: 0 },
  });

  const handleInputChange = (field: string, value: number) => {
    setFieldConfig((prevConfig) => ({
      ...prevConfig,
      [field]: { order: value },
    }));
  };

  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>AutoForm Reorder</CardTitle>
            <CardDescription>Reorder the form fields.</CardDescription>
          </CardHeader>

          <CardContent>
            <CardDescription className="mb-4">
              Default order in schema: <code>name</code>, <code>age</code>,{" "}
              <code>address</code>
            </CardDescription>

            <CardDescription className="mb-4">
              Reorder the fields by setting the order below:
            </CardDescription>

            <div className="mb-4 flex gap-2">
              {Object.keys(fieldConfig).map((key) => (
                <div key={key}>
                  <Label className="capitalize">{key}</Label>
                  <Input
                    type="number"
                    onChange={(e) => {
                      handleInputChange(key, parseInt(e.target.value));
                    }}
                  />
                </div>
              ))}
            </div>

            <AutoForm
              formSchema={formSchema}
              onSubmit={console.log}
              fieldConfig={fieldConfig}
            >
              <AutoFormSubmit>Send now</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Order;
