import { fieldConfig } from "@autoform/react";
import { ZodProvider } from "@autoform/zod";
import { YupProvider } from "@autoform/yup";
import * as z from "zod";
import { object, string, number, date, InferType, array, mixed } from "yup";

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketball",
  Baseball = "Baseball",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

const zodFormSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .superRefine(
      fieldConfig({
        description: "You cannot change this later.",
      })
    ),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .superRefine(
      fieldConfig({
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        inputProps: {
          type: "password",
        },
      })
    ),

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

  guests: z.array(
    z.object({
      name: z.string().optional(),
      age: z.number().optional(),
    })
  ),

  location: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
  }),
});

export const zodSchemaProvider = new ZodProvider(zodFormSchema);

const yupFormSchema = object({
  name: string().required().label("Your Name").default("John Doe"),
  age: number().required().positive().integer(),
  email: string()
    .email()
    .transform((val) => val),
  website: string().url().nullable(),
  // createdOn: date().default(() => new Date()),
  guests: array().of(
    object({
      name: string().required(),
    })
  ),
  sport: mixed().oneOf(Object.values(Sports)),
});

export const yupSchemaProvider = new YupProvider(yupFormSchema);
