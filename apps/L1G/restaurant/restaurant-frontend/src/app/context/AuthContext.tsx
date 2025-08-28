'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGetUserQuery } from '@/generated';
import { jwtDecode } from 'jwt-decode';
import jwt from 'jsonwebtoken';
type JwtPayload = { userId: string };

type User = {
  userId: string;
  email: string;
  phoneNumber?: string;
  profile?: string;
  password?: string;
} | null;

type AuthCtx = {
  user: User;
  setUser: (u: User) => void;
  token: string | null;
  signIn: (userData: User, token: string) => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedId, setDecodedId] = useState<string | null>(null);

  const signIn = (userData: User, jwt: string) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  const { data } = useGetUserQuery({
    variables: { input: { userId: decodedId || '' } },
    skip: !token || !decodedId,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      if (savedToken && !user) {
        try {
          const decoded = jwt.decode(savedToken);
          if (decoded?.userId) {
            setToken(savedToken);
            setDecodedId(decoded.userId);
          }
        } catch (e) {
          console.error('Token decode error', e);
          localStorage.removeItem('token');
        }
      }
    }
  }, [user]);
  console.log(decodedId);
  console.log(user);

  useEffect(() => {
    if (data?.getUser) {
      const userData: User = {
        userId: data.getUser.userId,
        email: data.getUser.email,
        phoneNumber: data.getUser.phoneNumber ?? undefined,
        profile: data.getUser.profile ?? undefined,
        password: data.getUser.password ?? undefined,
      };
      setUser(userData);
    }
  }, [data]);

  return <AuthContext.Provider value={{ user, setUser, token, signIn }}>{children}</AuthContext.Provider>;
};
