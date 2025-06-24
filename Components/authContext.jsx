'use client'
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldfetchPoints, setshouldfetchPoints] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, shouldfetchPoints, setshouldfetchPoints }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
