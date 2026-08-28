import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiUserPlus } from "react-icons/fi";
import styles from "./AsideAddUserForm.module.scss";
import { phoneMask } from "../../utils/format";
import { addUserSchema, type IUser } from "../../types/user";

interface AsideAddUserFormProps {
  onAdd: (data: IUser) => void;
}

export const AsideAddUserForm = ({ onAdd }: AsideAddUserFormProps) => {
  const form = useForm<IUser>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      mail: "",
      phone: "",
      age: undefined,
    },
  });

  const onSubmit = (data: IUser) => {
    onAdd(data);
    form.reset();
  };

  return (
    <aside className={styles.formCard}>
      <h2 className={styles.formTitle}>
        <FiUserPlus /> Add user
      </h2>
      <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
        <label className={styles.field}>
          Name*
          <input
            className={styles.input}
            type="text"
            inputMode="text"
            placeholder="Name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <span className={styles.error}>
              {form.formState.errors.name.message}
            </span>
          )}
        </label>
        <label className={styles.field}>
          Phone*
          <input
            className={styles.input}
            type="text"
            inputMode="numeric"
            placeholder="Phone"
            value={phoneMask(form.watch("phone"))}
            onChange={(e) => {
              const maskedValue = phoneMask(e.target.value);
              form.setValue("phone", maskedValue);
            }}
          />
          {form.formState.errors.phone && (
            <span className={styles.error}>
              {form.formState.errors.phone.message}
            </span>
          )}
        </label>
        <label className={styles.field}>
          Email
          <input
            className={styles.input}
            type="email"
            inputMode="email"
            placeholder="Email"
            {...form.register("mail")}
          />
          {form.formState.errors.mail && (
            <span className={styles.error}>
              {form.formState.errors.mail.message}
            </span>
          )}
        </label>
        <label className={styles.field}>
          Age
          <input
            className={styles.input}
            type="number"
            inputMode="numeric"
            placeholder="Age"
            {...form.register("age", { valueAsNumber: true })}
          />
          {form.formState.errors.age && (
            <span className={styles.error}>
              {form.formState.errors.age.message}
            </span>
          )}
        </label>
        <button type="submit" className={styles.submitButton}>
          Add User
        </button>
      </form>
    </aside>
  );
};
