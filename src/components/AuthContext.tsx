import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile, loginRequest } from "../services/api";

interface AuthContextProps {
  token: string | null;
  user: { fullname: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface LoginResponse {
  success: boolean;
  data: { token: string } | { message: string };
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<{ fullname: string; email: string } | null>(
    null
  );

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => {
          if ((res as { success: boolean }).success) {
            setUser(
              (
                res as {
                  success: boolean;
                  data: { fullname: string; email: string };
                }
              ).data
            );
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await loginRequest(email, password);
  
    if (res.success && 'token' in res.data) {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } else if ('message' in res.data) {
      alert(res.data.message);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
