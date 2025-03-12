import { createContext, useState, ReactNode } from "react";
import { User } from "../Types/User";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
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

  const login = (user: User) => {
    setUser(user);
    closeModals();
  };

  const logout = () => setUser(null);
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
