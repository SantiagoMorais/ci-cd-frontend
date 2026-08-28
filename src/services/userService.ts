import type { IUser, IUserRecord } from "../types/user";

const STORAGE_KEY = "users";

const saveUsers = (users: IUserRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const loadUsers = (): IUserRecord[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as IUserRecord[]) : [];
};

export const addUser = (users: IUserRecord[], data: IUser): IUserRecord[] => {
  const newUsers = [...users, { ...data, id: Date.now() }];
  saveUsers(newUsers);
  return newUsers;
};

export const removeUser = (users: IUserRecord[], id: number): IUserRecord[] => {
  const newUsers = users.filter((user) => user.id !== id);
  saveUsers(newUsers);
  return newUsers;
};

export const updateUser = (
  users: IUserRecord[],
  id: number,
  data: IUser,
): IUserRecord[] => {
  const newUsers = users.map((user) =>
    user.id === id ? { ...user, ...data } : user,
  );
  saveUsers(newUsers);
  return newUsers;
};
