'use client';

import { useGetCurrentUserLazyQuery } from '@/generated';
import { UserType } from '@/utils/type';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: UserType | null;
  logout: () => void;
  fetchUser: (_token: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  const extractUserData = (rawUser: any): UserType => {
    const { id, email, phone = '', firstName = '', lastName = '', birth = new Date(), emergencyPhone = '', relation = '' } = rawUser;
    return {
      id,
      email,
      phone,
      firstName,
      lastName,
      birth,
      emergencyPhone,
      relation,
    };
  };

  const [getCurrentUser] = useGetCurrentUserLazyQuery();

  const fetchUser = async (token: string) => {
    try {
      const { data } = await getCurrentUser({ variables: { jwt: token } });
      if (data?.getCurrentUser) {
        const userData = extractUserData(data.getCurrentUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const storedJWT = localStorage.getItem('authToken') || '';
    if (storedJWT) {
      fetchUser(storedJWT);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/signin');
  };

  return <AuthContext.Provider value={{ user, logout, fetchUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
