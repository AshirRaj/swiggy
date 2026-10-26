import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

const AUTH_STORAGE_KEY = 'swiggy_auth_user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getStorageItem(AUTH_STORAGE_KEY, null);
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    if (user) {
      setStorageItem(AUTH_STORAGE_KEY, user);
    } else {
      removeStorageItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const loginWithPhone = (phone, name = 'Swiggy Foodie') => {
    const newUser = {
      id: 'usr-' + Date.now(),
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      name: name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@swiggy.demo`,
      isSwiggyOne: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        loginWithPhone,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
