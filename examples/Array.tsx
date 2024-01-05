import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import Json from "@/components/ui/json";
import { useState } from "react";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const formSchema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      })
    )
    .describe("Guests invited to the party"),
});

function Array() {
  const [formValues, setFormValues] = useState({});

  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Array support</CardTitle>
            <CardDescription>
              You can use arrays in your schemas to create dynamic forms.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AutoForm
              formSchema={formSchema}
              values={formValues}
              onValuesChange={setFormValues}
              onSubmit={console.log}
            >
              <AutoFormSubmit>Send now</AutoFormSubmit>
            </AutoForm>

            <Json data={formValues} className="mt-6" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Array;
