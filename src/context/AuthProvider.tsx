import * as React from "react";
import Role from "../common/Roles";

export interface UserType {
  username: string;
  role: Role;
  deposit: number;
}

interface AuthContextType {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType>(null!);
  const value = React.useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
