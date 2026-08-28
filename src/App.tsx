import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import styles from "./app.module.scss";
import { UserTable } from "./components/UserTable/UserTable";
import { AsideAddUserForm } from "./components/AsideAddUserForm/AsideAddUserForm";
import { addUser, loadUsers, removeUser } from "./services/userService";
import type { IUser, IUserRecord } from "./types/user";

export const App = () => {
  const [users, setUsers] = useState<IUserRecord[]>(loadUsers);

  const handleAdd = (data: IUser) => {
    setUsers((prev) => addUser(prev, data));
  };

  const handleRemove = (id: number) => {
    setUsers((prev) => removeUser(prev, id));
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <FiUsers /> Users
        </h1>
        <p className={styles.subtitle}>
          Manage the people registered on the platform
        </p>
      </header>
      <main className={styles.main}>
        <UserTable users={users} onRemove={handleRemove} />
        <AsideAddUserForm onAdd={handleAdd} />
      </main>
    </div>
  );
};
