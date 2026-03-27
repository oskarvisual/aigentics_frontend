import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { authStorageKey, workspaceApi } from "@/services/api";
import { workspaceSnapshot } from "@/services/mock-data";
import type { WorkspaceUser } from "@/types/workspace";

interface AuthContextValue {
  token: string | null;
  user: WorkspaceUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<WorkspaceUser | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(authStorageKey);

    if (storedToken) {
      setToken(storedToken);
      setUser(workspaceSnapshot.currentUser);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login: async (email: string, password: string) => {
        if (!password) {
          throw new Error("Password is required.");
        }

        const response = await workspaceApi.login(email);
        window.localStorage.setItem(authStorageKey, response.token);
        setToken(response.token);
        setUser(response.user);
      },
      logout: async () => {
        await workspaceApi.logout();
        window.localStorage.removeItem(authStorageKey);
        setToken(null);
        setUser(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
