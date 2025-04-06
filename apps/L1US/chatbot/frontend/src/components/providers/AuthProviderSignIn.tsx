'use client';

import { createContext, useContext } from 'react';
import { useLoginUserMutation, LoginUserMutation } from '@/generated'; // assuming these exist
import { useRouter } from 'next/navigation';

type SignInParams = {
  email: string;
  password: string;
};

type AuthContextType = {
  signin: (_params: SignInParams) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProviderSignIn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [loginUser] = useLoginUserMutation({
    onCompleted: (data: LoginUserMutation) => {
      localStorage.setItem('token', data.loginUser.sessionToken);
      router.push('/');
    },
    onError: (error) => {
      console.error('Error signing in user: ', error.message);
    },
  });

  const signin = async ({ email, password }: SignInParams) => {
    await loginUser({
      variables: { input: { email, password } },
    });
  };

  return <AuthContext.Provider value={{ signin }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
