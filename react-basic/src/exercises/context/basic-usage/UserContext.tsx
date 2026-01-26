/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

export type User = {
  name: string;
  role: string;
};

const UserContext = createContext<User | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user] = useState<User | null>({
    name: "田中太郎",
    role: "管理者",
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): User => {
  const user = useContext(UserContext);
  if (user === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
};
