import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../Types/User";

interface AuthContextType {
  user: User | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  showLogin: boolean;
  showRegister: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModals: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
    }
  }, []);

  const login = (user: User, accessToken: string) => {
    setUser(user);
    localStorage.setItem("authToken", accessToken); 
    localStorage.setItem("user", JSON.stringify(user));
    closeModals();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("user"); 
  };

  const openLogin = () => setShowLogin(true);
  const openRegister = () => setShowRegister(true);
  const closeModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showLogin, showRegister, openLogin, openRegister, closeModals }}>
      {children}
    </AuthContext.Provider>
  );
};
