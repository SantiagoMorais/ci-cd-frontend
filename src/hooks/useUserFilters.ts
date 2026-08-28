import { useState } from "react";
import type { IUserRecord } from "../types/user";

export interface UserFilters {
  name: string;
  phone: string;
  email: string;
}

const emptyFilters: UserFilters = { name: "", phone: "", email: "" };

export const useUserFilters = (users: IUserRecord[]) => {
  const [filters, setFilters] = useState<UserFilters>(emptyFilters);

  const setFilter = <K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(filters.name.trim().toLowerCase());
    const matchesPhone = user.phone.includes(filters.phone.trim());
    const matchesEmail = (user.mail ?? "")
      .toLowerCase()
      .includes(filters.email.trim().toLowerCase());
    return matchesName && matchesPhone && matchesEmail;
  });

  return { filters, setFilter, filteredUsers };
};
