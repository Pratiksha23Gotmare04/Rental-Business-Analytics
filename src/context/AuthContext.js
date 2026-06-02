import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const mockUsers = {
      'admin@rental.com': { id: 'admin1', email: 'admin@rental.com', name: 'Admin User', role: 'admin', password: 'admin123' },
      'user@rental.com': { id: 'user1', email: 'user@rental.com', name: 'John Doe', role: 'user', password: 'user123' },
    };

    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      const userData = { id: mockUser.id, email: mockUser.email, name: mockUser.name, role: mockUser.role };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const signup = (fullName, email, password) => {
    // Mock signup - in real app, this would call backend
    if (!email || !password || !fullName) {
      return { success: false, message: 'Please fill all fields' };
    }

    const userData = {
      id: 'user' + Date.now(),
      email,
      name: fullName,
      role: 'user',
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
