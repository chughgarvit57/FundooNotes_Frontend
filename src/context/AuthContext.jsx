import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ?? null;
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
