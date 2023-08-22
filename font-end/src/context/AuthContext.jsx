// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (token) => {
    setUser({ token });
    Cookies.set("token", token, { expires: 7 }); // Store the token in a cookie
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token"); // Remove the token from the cookie
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
