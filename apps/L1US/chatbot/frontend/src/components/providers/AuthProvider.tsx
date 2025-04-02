'use client';

import { createContext, useContext } from 'react';
import { useRegisterUserMutation, RegisterUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  signup: (_params: SignUpParams) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [registerUser] = useRegisterUserMutation({
    onCompleted: (data: RegisterUserMutation) => {
      localStorage.setItem('token', data.registerUser.sessionToken);
      router.push('/');
    },
    onError: (error) => {
      console.log('Error creating new user: ', error.message);
    },
  });
  const signup = async ({ username, email, password }: SignUpParams) => {
    await registerUser({
      variables: { input: { username, email, password } },
    });
  };

  return <AuthContext.Provider value={{ signup }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
