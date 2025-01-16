'use client';
import { Employee, useGetEmployeeByIdLazyQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface UserContextType {
  logout: () => void;
  user: Employee | undefined | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();

  const [getEmployeeById, { data }] = useGetEmployeeByIdLazyQuery();

  const logout = () => {
    console.log('logout');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token') as string;

    const parsedToken = JSON.parse(storedToken);

    if (parsedToken) {
      getEmployeeById({ variables: { getEmployeeByIdId: parsedToken } });
    } else {
      router.push('/login');
    }
  }, [router]);

  return <UserContext.Provider value={{ user: data?.getEmployeeById, logout }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
