'use client';

import { usePasswordRecoveryMutation, User, useRequestPasswordRecoveryMutation, useSignInUserMutation, useSignUpUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type PasswordRecoveryParams = {
  email: string;
  password: string;
  otp: string;
};

type RequestPasswordRecoveryParams = {
  email: string;
};

type AuthContextType = {
  signin: (_param: SignInParams) => void;
  signup: (_params: SignUpParams) => void;
  signout: () => void;
  requestPasswordRecovery: (_params: RequestPasswordRecoveryParams) => void;
  passwordRecovery: (_params: PasswordRecoveryParams) => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [signinMutation] = useSignInUserMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signInUser.token);
      setUser(data.signInUser.user);
      router.push('/');
      toast('Signin successful!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [signupMutation] = useSignUpUserMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUpUser.token);
      setUser(data.signUpUser.user);
      router.push('/');
      toast('Signup successful!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [requestPasswordRecoveryMutation] = useRequestPasswordRecoveryMutation({
    onCompleted: (data) => {
      toast.success('Амжилттай илгээлээ');
      router.push(`/change-password?email=${data.requestPasswordRecovery.email}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [passwordRecoveryMutation] = usePasswordRecoveryMutation({
    onCompleted: () => {
      toast.success('Амжилттай солигдлоо');
      router.push('/signin');
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

  const signup = async ({ name, email, password, phone }: SignUpParams) => {
    await signupMutation({
      variables: {
        input: {
          name,
          email,
          password,
          phone,
        },
      },
    });
  };

  const signout = () => {
    localStorage.removeItem('token');
    router.push('/');
    toast.success('Successfully signed out');
    setUser(null);
  };

  const requestPasswordRecovery = async ({ email }: RequestPasswordRecoveryParams) => {
    await requestPasswordRecoveryMutation({
      variables: {
        input: {
          email,
        },
      },
    });
  };

  const passwordRecovery = async ({ email, password, otp }: PasswordRecoveryParams) => {
    await passwordRecoveryMutation({
      variables: {
        input: {
          email,
          password,
          otp,
        },
      },
    });
  };

  return <AuthContext.Provider value={{ signin, signup, user, signout, requestPasswordRecovery, passwordRecovery }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
