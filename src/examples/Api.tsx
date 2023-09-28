import * as z from "zod";
import AutoForm from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import React from "react";

function Api() {
  const [formSchema, setFormSchema] = React.useState<z.ZodObject<
    any,
    any
  > | null>(null);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formSchema = z.object({
          Options: z.enum(data.map((user: any) => user.name)),
        });

        setFormSchema(formSchema);
      });
  }, []);

  return (
    <div className="mx-auto my-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>API Example</CardTitle>
          <CardDescription>
            The form select options are fetched from an API.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            {formSchema ? (
              <AutoForm formSchema={formSchema} onSubmit={console.log} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Api;
