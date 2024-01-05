import * as z from "zod";
import AutoForm from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import React, { useEffect } from "react";

const formSchema = z.object({
  username: z.string(),
});

function Controlled() {
  const [values, setValues] = React.useState<
    Partial<z.infer<typeof formSchema>>
  >({});

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Controlled</CardTitle>
            <CardDescription>
              This example shows how to use AutoForm in a controlled way.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AutoForm
              formSchema={formSchema}
              values={values}
              onValuesChange={setValues}
            ></AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Controlled;
