import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const StoredUser = localStorage.getItem("user");
    const tokens = localStorage.getItem("tokens");

    if (StoredUser && tokens) {
      setUser(JSON.parse(StoredUser));
      setTokens(tokens);
    }
    setLoading(false);
  }, []);

  const login = (user, token) => {
    setUser(user);
    setTokens(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokens", token);
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
