'use client'
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [PointsToAdd, setPointsToAdd] = useState(0);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, PointsToAdd, setPointsToAdd }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
