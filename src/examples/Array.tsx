import React, { useState } from "react";
import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const appliances = ["Fridge", "Dispenser", "Iron", "Electric Kettle"];

const formSchema = z.object({
  invitedGuests: z
    .array(
      z.object({
        Appliances: z.array(
          z.object({
            appliance: z.enum(appliances),
            hours: z
              .enum(["0-2", "2-4", "4-6", "6-8", "8-16", "16-24"])
              .describe("Daily Usage in Hours"),
          }),
        ),
      }),
    )
    .describe("Rooms in your house"),
});

function Array() {
  const [formValues, setFormValues] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (values) => {
    setFormValues(values);
    setShowResults(true);
  };

  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Room-Wise Data</CardTitle>
            <CardDescription>Individual room information</CardDescription>
          </CardHeader>

          <CardContent>
            {!showResults ? (
              <AutoForm
                formSchema={formSchema}
                values={formValues}
                onValuesChange={setFormValues}
                onSubmit={handleSubmit}
                fieldConfig={{
                  invitedGuests: {
                    hourss: {
                      fieldType: "radio",
                    },
                  },
                  hours: { fieldType: "radio" },
                }}
              >
                <AutoFormSubmit>Send now</AutoFormSubmit>
              </AutoForm>
            ) : (
              <div>
  <h2>Form Data:</h2>
  <table>
    <thead>
      <tr>
        <th>Room</th>
        <th>Appliance</th>
        <th>Daily Usage</th>
      </tr>
    </thead>
    <tbody>
      {formValues.invitedGuests.map((room, roomIndex) => (
        room.Appliances.map((appliance, applianceIndex) => (
          <tr key={`${roomIndex}-${applianceIndex}`}>
            <td>Room {roomIndex + 1} </td>
            <td> { appliance.appliance}</td>
            <td>{appliance.hours} hours</td>
          </tr>
        ))
      ))}
    </tbody>
  </table>
</div>


            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Array;
