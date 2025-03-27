'use client';

import { createContext, useContext } from 'react';
import { useRegisterUserMutation, RegisterUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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
      toast.success('Sign-up Successful!', { autoClose: 1000 });
      router.push('/');
    },
    onError: (error) => {
      toast.error(`${error.message}`, { autoClose: 1000 });
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
