"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { IUser } from "@/interfaces/users";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  login: (newToken: string, userData: IUser) => void;
  logout: () => void;
  update: (data: IUser) => void;
  updatePassword: (data: IUser) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken) {
      setIsAuthenticated(true);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (newToken: string, userData: IUser) => {
    Cookies.set("token", newToken, { expires: 1 });
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });

    setIsAuthenticated(true);
    setUser(userData);
    router.push("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/auth/login");
  };

  const update = (data: IUser) => {
    setUser(data);
    Cookies.set("user", JSON.stringify(data), { expires: 1 });
  };
  const updatePassword = (data: IUser) => {
    setUser(data);
    Cookies.set("user", JSON.stringify(data), { expires: 1 });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        update,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
