'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGetUserLazyQuery, useGetUserQuery, User } from '@/generated';
import jwt from 'jsonwebtoken';

type JwtPayload = { userId: string };

type AuthCtx = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>; // ✅ callback setter зөвшөөрнө
  token: string | null;
  signIn: (userData: User, token: string) => void;
};

export const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [decodedId, setDecodedId] = useState<string | null>(null);

  const signIn = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  };

  const [getUserById, { data }] = useGetUserLazyQuery();

  // LocalStorage-с token унших
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token');
      if (savedToken && !user) {
        try {
          const decoded = jwt.decode(savedToken) as any;
          console.log('decoded!.user!._id:', decoded!.user!._id);
          if (decoded!.user!._id) {
            console.log('sisisis');
            setToken(savedToken);
            setDecodedId(decoded!.user!._id);
          }
        } catch (e) {
          console.error('Token decode error', e);
          localStorage.removeItem('token');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (decodedId) {
      getUserById({
        variables: {
          input: {
            userId: decodedId,
          },
        },
        onCompleted: (data) => {
          setUser(data.getUser);
        },
        onError: () => {
          // HEREGLEGCH GARGAH UILDEL
          // setUser(null);
        },
      });
    } else {
      // HEREGLEGCH GARGAH UILDEL
    }
  }, [decodedId]);

  // GraphQL-аас хэрэглэгчийн мэдээлэл авах
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
