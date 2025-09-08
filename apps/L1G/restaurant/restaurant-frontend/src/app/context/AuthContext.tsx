'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useGetUserLazyQuery, User } from '@/generated';
import jwt from 'jsonwebtoken';

type AuthCtx = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  signIn: (_userData: User, _token: string) => void;
};

export const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedId, setDecodedId] = useState<string | null>(null);

  const signIn = useCallback((userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  }, []);

  const [getUserById] = useGetUserLazyQuery();

  // Extract token handling logic to a separate function
  const handleToken = useCallback((savedToken: string) => {
    try {
      const decoded = jwt.decode(savedToken) as { user?: { _id: string } } | null;
      if (decoded?.user?._id) {
        setToken(savedToken);
        setDecodedId(decoded.user._id);
        return true;
      }
    } catch (e) {
      console.error('Token decode error', e);
      localStorage.removeItem('token');
    }
    return false;
  }, []);

  // LocalStorage-с token унших
  useEffect(() => {
    if (typeof window === 'undefined' || user) return;

    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      handleToken(savedToken);
    }
  }, [user, handleToken]);

  // GraphQL-аас хэрэглэгчийн мэдээлэл авах
  useEffect(() => {
    if (!decodedId) return;

    getUserById({
      variables: { input: { userId: decodedId } },
      onCompleted: (response) => {
        if (response?.getUser) {
          setUser({
            userId: response.getUser.userId,
            email: response.getUser.email,
            password: response.getUser.password,
            phoneNumber: response.getUser.phoneNumber ?? undefined,
            profile: response.getUser.profile ?? undefined,
            role: response.getUser.role,
            username: response.getUser.username,
          });
        }
      },
      onError: () => {
        setUser(null);
      },
    });
  }, [decodedId, getUserById]);

  return <AuthContext.Provider value={{ user, setUser, token, signIn }}>{children}</AuthContext.Provider>;
};
