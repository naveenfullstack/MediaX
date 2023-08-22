import { createContext, useContext, useState, useEffect  } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useCookies(['token']);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (token.token) {
      // Fetch user data or perform any other necessary checks
      // Example: fetchUserData(token.token).then((data) => setUser(data));
    }
  }, [token.token]);

  const login = (newToken, userData) => {
    setToken('token', newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken('token', '', { path: '/' }); // Clear the token cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
