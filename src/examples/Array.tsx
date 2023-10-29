import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useState } from "react";
import Json from "@/components/ui/json";

const appliances = ["Fridge", "Dispenser", "Iron", "Electric Kettle"]

const formSchema = z.object({
  invitedGuests: z
    .array(
      z.object({
        Appliances: z
        .array(
          z.object({
            appliance: z.enum(
              appliances
            ),
            dailyUsageInHours: z.number()
          })
        ),
      }),
    )
    .describe("Rooms in your house"),
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
              Individual room information
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
