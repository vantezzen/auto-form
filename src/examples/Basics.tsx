import * as z from "zod";
import AutoForm, { AutoFormSubmit } from "../components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

enum Sports {
  Football = "football",
  Basketball = "basketball",
  Baseball = "baseball",
  Hockey = "hockey",
  None = "none",
}

const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),

  favouriteNumber: z.coerce
    .number({
      invalid_type_error: "Favourite number must be a number.",
    })
    .min(1, {
      message: "Favourite number must be at least 1.",
    })
    .max(10, {
      message: "Favourite number must be at most 10.",
    })
    .default(1)
    .optional(),

  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),

  sendMeMails: z.boolean().optional(),

  birthday: z.coerce.date().optional(),

  color: z.enum(["red", "green", "blue"]),

  // Another enum example
  marshmallows: z
    .enum(["not many", "a few", "a lot", "too many"])
    .describe("How many marshmallows fit in your mouth?"),
  
  // Native enum example
  sports: z.nativeEnum(Sports).describe("What is your favourite sport?"),

  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    })
    .optional(),

  customParent: z.string().optional(),
});

function Basics() {
  return (
    <>
      <div className="max-w-lg mx-auto my-6">
        <Card>
          <CardHeader>
            <CardTitle>AutoForm Example</CardTitle>
            <CardDescription>
              Automatically generate a form from a Zod schema.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AutoForm
              formSchema={formSchema}
              onSubmit={console.log}
              fieldConfig={{
                password: {
                  inputProps: {
                    type: "password",
                    placeholder: "••••••••",
                  },
                },
                favouriteNumber: {
                  description: "Your favourite number between 1 and 10.",
                  inputProps: {
                    type: "number",
                  },
                },
                acceptTerms: {
                  inputProps: {
                    required: true,
                  },
                  description: (
                    <>
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-primary underline"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Terms and conditions clicked.");
                        }}
                      >
                        terms and conditions
                      </a>
                      .
                    </>
                  ),
                },

                birthday: {
                  description: "We need your birthday to send you a gift.",
                },

                sendMeMails: {
                  fieldType: "switch",
                },

                bio: {
                  fieldType: "textarea",
                },

                marshmallows: {
                  fieldType: "radio",
                },

                sports: {
                  fieldType: "select"
                },

                customParent: {
                  renderParent: ({ children }) => (
                    <div className="flex items-end gap-3">
                      <div className="flex-1">{children}</div>
                      <div>
                        <Button type="button">Check</Button>
                      </div>
                    </div>
                  ),
                },
              }}
            >
              <AutoFormSubmit>Send now</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Basics;
