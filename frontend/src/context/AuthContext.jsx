import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // In a real app, you might decode the token or fetch user profile here
      // For now, we'll just persist the token state
      localStorage.setItem('token', token);
      // Decode token to get username if possible, or just set a flag
      // For simplicity, we assume if token exists, user is logged in
      if (!user) {
        setUser({ username: 'User' }); // Placeholder
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await authApi.login(username, password);
      const { token } = response.data;
      setToken(token);
      setUser({ username });
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await authApi.register(username, password);
      const { token } = response.data;
      setToken(token);
      setUser({ username });
      return true;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};