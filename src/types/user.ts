import z from "zod";

export const addUserSchema = z.object({
  name: z.string("Name is required").min(1, "Name is required"),
  phone: z
    .string("Phone is required")
    .regex(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-8])\d{3})-?(\d{4}))$/,
      "Phone must be a valid number",
    ),
  mail: z.email("Invalid email").optional(),
  age: z
    .number("Age is required")
    .min(0, "Age must be a positive number")
    .optional(),
});

export type IUser = z.infer<typeof addUserSchema>;
export type IUserRecord = IUser & { id: number };
