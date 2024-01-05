import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const formSchema = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  });

function ConfirmPassword() {
  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Confirm Password</CardTitle>
            <CardDescription>
              Refined schema to validate that two fields match.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AutoForm formSchema={formSchema} onSubmit={console.log}>
              <AutoFormSubmit>Send now</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ConfirmPassword;
