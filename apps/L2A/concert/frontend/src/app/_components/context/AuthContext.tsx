'use client';

import { useGetUserInfoQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, Dispatch, ReactNode, useContext, useState, useEffect } from 'react';

type UserType = {
  id: string;
  email: string;
  phone: number | null;
  isAdmin: boolean;
  bookings?: { id: string } | null;
};

type AuthContextType = {
  JWT: string;
  setJWT: Dispatch<React.SetStateAction<string>>;
  user: UserType | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [JWT, setJWT] = useState<string>('');
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedJWT = localStorage.getItem('token');
    if (storedJWT) {
      setJWT(storedJWT);
    }
  }, []);

  useEffect(() => {
    if (JWT) {
      localStorage.setItem('token', JWT);
    }
  }, [JWT]);

  const { data } = useGetUserInfoQuery({
    variables: { jwt: JWT },
    skip: !JWT,
  });

  useEffect(() => {
    if (data?.GetUserInfo) {
      const { id, email, phone, isAdmin } = data.GetUserInfo;
      const userData = {
        id,
        email,
        phone: phone ?? null,
        isAdmin,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.clear();
    }
  }, [data]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    setJWT('');
    setUser(null);
    router.push('/auth/signin');
  };

  return <AuthContext.Provider value={{ JWT, setJWT, user, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
