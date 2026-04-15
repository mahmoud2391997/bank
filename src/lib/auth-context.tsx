import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
  impersonatedUser: any | null;
  setImpersonatedUser: (user: any | null) => void;
  login: (email: string, role?: 'admin' | 'client') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  impersonatedUser: null,
  setImpersonatedUser: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [impersonatedUser, setImpersonatedUser] = useState<any | null>(null);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('prominence_user');
    const savedProfile = localStorage.getItem('prominence_profile');
    
    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser));
      setProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: 'admin' | 'client' = 'client') => {
    const mockUser = {
      uid: role === 'admin' ? 'admin-123' : 'client-123',
      email: email,
      displayName: email.split('@')[0],
    };
    
    const mockProfile = {
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
      role: role,
      kycStatus: 'approved',
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem('prominence_user', JSON.stringify(mockUser));
    localStorage.setItem('prominence_profile', JSON.stringify(mockProfile));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setImpersonatedUser(null);
    localStorage.removeItem('prominence_user');
    localStorage.removeItem('prominence_profile');
  };

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    impersonatedUser,
    setImpersonatedUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
