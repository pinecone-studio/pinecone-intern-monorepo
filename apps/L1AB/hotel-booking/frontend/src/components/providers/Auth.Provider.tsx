'use client';

import { useSignInMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SignInForm = {
  email: string;
  password: string;
};

type User = {
  _id: string;
  email: string;
  phone?: string | null;
  isAdmin: boolean;
};

type AuthContextType = {
  signin: (_params: SignInForm) => Promise<void>;
  signout: () => void;
  signInLoading: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [signinMutation, { loading: signInLoading }] = useSignInMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn.token);
      setUser(data.signIn.user);
      router.push('/');
      toast.success('Sign-in successful!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const signin = async ({ email, password }: SignInForm) => {
    await signinMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  const signout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
    toast.success('Successfully signed out.');
  };

  return <AuthContext.Provider value={{ signin, signout, user, signInLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
