'use client';
import { useGetCurrentUserQuery } from '@/generated';
import { UserType } from '@/utils/type';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: UserType | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [JWT, setJWT] = useState<string>('');
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedJWT = localStorage.getItem('authToken');
    if (storedJWT) setJWT(storedJWT);
  }, []);

  const { data } = useGetCurrentUserQuery({
    variables: { jwt: JWT },
    skip: !JWT,
  });

  const extractUserData = (rawUser: any): UserType => {
    const { email, phone = '', firstName = '', lastName = '', birth = new Date(), emergencyPhone = '', relation = '' } = rawUser;
    return {
      email,
      phone,
      firstName,
      lastName,
      birth,
      emergencyPhone,
      relation,
    };
  };

  const handleUserData = () => {
    if (data?.getCurrentUser) {
      const userData = extractUserData(data.getCurrentUser);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.clear();
    }
  };

  useEffect(() => {
    handleUserData();
  }, [data, handleUserData]);

  const logout = () => {
    localStorage.removeItem('authToken');
    setJWT('');
    setUser(null);
    router.push('/auth/signin');
  };

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
