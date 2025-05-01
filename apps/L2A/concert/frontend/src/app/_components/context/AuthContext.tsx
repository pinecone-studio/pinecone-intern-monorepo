'use client';

import { useGetUserInfoQuery } from '@/generated';
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
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
      localStorage.setItem('jwt', JWT);
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

  return <AuthContext.Provider value={{ JWT, setJWT, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
