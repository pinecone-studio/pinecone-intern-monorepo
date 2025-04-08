'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { useRegisterUserMutation, RegisterUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: RegisterUserMutation['registerUser']['user'] | null;
  error: string | null;
  signup: (_params: SignUpParams) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<RegisterUserMutation['registerUser']['user'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [registerUser] = useRegisterUserMutation({
    onCompleted: (data: RegisterUserMutation) => {
      localStorage.setItem('token', data.registerUser.sessionToken);
      setUser(data.registerUser.user);
      setError(null)
      router.push('/');
    },
    onError: (error) => {
      console.log('Error creating new user: ', error.message);
      setError(error.message);
      setUser(null);
    },
  });

  const signup = async ({ username, email, password }: SignUpParams) => {
    await registerUser({
      variables: { input: { username, email, password } },
    });
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
    router.push('/')
  }, [router]);

  return <AuthContext.Provider value={{ signup, logout, error, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
