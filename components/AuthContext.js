// components/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userToken: null,
    userId: null,
  });

  const login = (token, userId) => {
    setAuthState({
      userToken: token,
      userId: userId,
    });
  };

  const logout = () => {
    setAuthState({
      userToken: null,
      userId: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
