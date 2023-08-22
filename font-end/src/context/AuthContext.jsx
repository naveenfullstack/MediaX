// AuthContext.js
import React, { createContext, useContext, useState , useEffect,} from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a token exists in cookies on app startup
    const token = Cookies.get("token");
    console.log("Token from cookie:", token);
  
    if (token) {
      // Set the user context with the token
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    setUser({ token });
    Cookies.set("token", token, { expires: 7 }); // Store the token in a cookie
    console.log("User logged in with token:", token);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token"); // Remove the token from the cookie
    console.log("User logged out");
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
