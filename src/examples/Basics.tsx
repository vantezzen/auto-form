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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketball",
  Baseball = "Baseball",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

enum Units {
  sqft = "sqft",
  gaz = "gaz",
}

const numberSchema = z.coerce
  .number({
    invalid_type_error: 'Invalid input for the number field.',
  })
  .min(0, {
    message: 'Please enter a positive number.',
  });

const radioSchema = z.nativeEnum(Sports);

const formSchema = z.object({
  people: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .describe("How many people live in your house?"),
  octBill: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .max(2000, {
      message: "Please enter a number less than 2000",
    })
    .describe("How many units of electricity did you consume in October?"),
  sepBill: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .max(2000, {
      message: "Please enter a number less than 2000",
    })
    .describe("How many units of electricity did you consume in November?"),
  augBill: z.coerce
    .number({
      invalid_type_error: "Kindly enter a number.",
    })
    .min(0, {
      message: "Please enter a positive number",
    })
    .max(2000, {
      message: "Please enter a number less than 2000",
    })
    .describe("How many units of electricity did you consume in August?"),
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

  color: z.enum(["red", "green", "blue"]).optional(),

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

  size: z.coerce.number().optional().describe("What is the size of your house?"),
});

function Basics() {
  return (
    <>
      <div className="mx-auto my-6 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Bill-E</CardTitle>
            <CardDescription>This survey aims to</CardDescription>
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
                },
                acceptTerms: {
                  inputProps: {
                    required: true,
                  },
                  description: (
                    <>
                      I agree to the{" "}
                      <button
                        className="text-primary underline"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("Terms and conditions clicked.");
                        }}
                      >
                        terms and conditions
                      </button>
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

                size: {
                  renderParent: ({ children }) => (
                    <div className="flex items-end gap-20">
                      <div className="flex-5">{children}</div>
                      <div>
                        <RadioGroup
                          onValueChange={(v) => console.log(v)}
                          defaultValue={Units.sqft}
                          className="flex flex-col space-y-1"
                        >
                          {Object.values(Units).map((value: any) => (
                            <FormItem
                              className="flex items-center space-x-5 space-y-0"
                              key={value}
                            >
                              <FormControl>
                                <RadioGroupItem value={value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {value}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
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
