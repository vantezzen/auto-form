import * as z from "zod";
import AutoForm from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string(),
});

function InputWithoutLabel() {
  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Input Without Label</CardTitle>
            <CardDescription>
              This example shows how to use AutoForm input without label.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AutoForm
              formSchema={formSchema}
              fieldConfig={{
                username: {
                  inputProps: {
                    showLabel: false,
                    placeholder: "Username",
                  },
                  renderParent: ({ children }) => (
                    <div className="flex items-end gap-3">
                      <div className="flex-1">{children}</div>
                      <div>
                        <Button type="button">Update</Button>
                      </div>
                    </div>
                  ),
                },
              }}
            ></AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default InputWithoutLabel;
