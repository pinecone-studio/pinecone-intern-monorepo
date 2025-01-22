'use client';

import { useLoginMutation, User, useRegisterMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SignInParams = {
  email?: string;
  phone?: string;
  password: string;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  signin: (_params: SignInParams) => void;
  signup: (_params: SignUpParams) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [signinMutation] = useLoginMutation({
    onCompleted: (data) => {
      const log = data?.login._id;
      sessionStorage.setItem('userId', log);
      setUser(data.login);
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [signupMutation] = useRegisterMutation({
    onCompleted: (data) => {
      const log = data?.register.user._id;
      localStorage.setItem('token', log);
      setUser(data?.register.user);
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const signin = async ({ email, password }: SignInParams) => {
    await signinMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  const signup = async ({ name, email, phone, password, isAdmin }: SignUpParams) => {
    await signupMutation({
      variables: {
        input: {
          name,
          email,
          password,
          phone,
          isAdmin,
        },
      },
    });
  };

  const values = { user, signin, signup };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
