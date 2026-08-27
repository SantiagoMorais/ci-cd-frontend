import { useState } from "react";
import styles from "./app.module.scss";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const addUserSchema = z.object({
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

type IUser = z.infer<typeof addUserSchema>;

const phoneMask = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");
  const match = cleanedValue.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
};

export const App = () => {
  const form = useForm<IUser>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      mail: "",
      phone: "",
      age: undefined,
    },
  });

  const [users, setUsers] = useState<(IUser & { id: number })[]>(() => {
    const users = localStorage.getItem("users") as
      (IUser & { id: number })[] | null;
    return users || [];
  });

  const onSubmit = (data: IUser) => {
    setUsers((prev) => {
      const newUsers = [
        ...prev,
        { ...data, id: Math.floor(Math.random() * 100000) },
      ];
      localStorage.setItem("users", JSON.stringify(newUsers));
      return newUsers;
    });

    form.reset();
  };

  return (
    <div className={styles.app}>
      <header></header>
      <main>
        <section>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Phone: {user.phone}</p>
                <p>Email: {user.mail ?? "-"}</p>
                <p>Age: {user.age ?? "-"}</p>
              </li>
            ))}
          </ul>
        </section>
        <aside>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <label>
              Name*
              <input
                type="text"
                inputMode="text"
                placeholder="Name"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <span>{form.formState.errors.name.message}</span>
              )}
            </label>
            <label>
              Phone*
              <input
                type="string"
                inputMode="numeric"
                placeholder="Phone"
                value={phoneMask(form.watch("phone"))}
                onChange={(e) => {
                  const maskedValue = phoneMask(e.target.value);
                  form.setValue("phone", maskedValue);
                }}
              />
              {form.formState.errors.phone && (
                <span>{form.formState.errors.phone.message}</span>
              )}
            </label>
            <label>
              Email
              <input
                type="email"
                inputMode="email"
                placeholder="Email"
                {...form.register("mail")}
              />
              {form.formState.errors.mail && (
                <span>{form.formState.errors.mail.message}</span>
              )}
            </label>
            <label>
              Age
              <input
                type="number"
                inputMode="numeric"
                placeholder="Age"
                {...form.register("age", { valueAsNumber: true })}
              />
              {form.formState.errors.age && (
                <span>{form.formState.errors.age.message}</span>
              )}
            </label>
            <button type="submit">Add User</button>
          </form>
        </aside>
      </main>
    </div>
  );
};
