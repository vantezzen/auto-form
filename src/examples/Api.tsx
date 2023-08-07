import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useEffect, useState } from "react";
import Combobox from "../components/ui/combobox"; // Import the ComboboxDemo component from the separate file

function Api() {
  const [formSchema, setFormSchema] = useState<z.ZodObject<
    any,
    any,
    any
  > | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formSchema = z.object({
          user: z.enum(data.map((user: any) => user.name)),
        });

        setFormSchema(formSchema);
      });
  }, []);

  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>API Example</CardTitle>
            <CardDescription>
              The form select options are fetched from an API.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {formSchema ? (
              <Combobox
                users={formSchema.shape.user._def.values}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            ) : (
              <div>Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Api;
