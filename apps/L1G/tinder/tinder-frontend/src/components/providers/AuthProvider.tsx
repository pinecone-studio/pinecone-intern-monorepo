'use client';

import { useLoginMutation, User, useSignupMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SignUpParams = {
  email: string;
  password: string;
  address: string;
  firstName: string;
  lastName: string;
  phone: string;
};

type LogInParams = {
  email: string;
  password: string;
};

type ChangePasswordParams = {
  email: string;
  password: string;
  otp: string;
};

type RequestChangePasswordParams = {
  email: string;
};

type AuthContextType = {
  login: (_params: LogInParams) => void;
  signup: (_params: SignUpParams) => void;
  signout: () => void;
  requestChangePassword: (_params: RequestChangePasswordParams) => void;
  changePassword: (_params: ChangePasswordParams) => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      console.log('Login mutation completed:', data);
      localStorage.setItem('token', data.login.token || data.login);
      setUser(data.login.user || null);
      router.push('/');
    },
    onError: (error) => {
      console.error('Login mutation error:', error.message);
      const errorMessage = error.message.includes('JWT_SECRET') ? 'Server configuration error. Please try again later.' : error.message;
      toast.error(errorMessage);
    },
  });

  const [signupMutation] = useSignupMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.register.token);
      setUser(data.register.user);
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // const [requestChangePasswordMutation] = requestChangePasswordMutation({
  //   onCompleted: (data) => {
  //     toast.success('Амжилттай илгээлээ');
  //     router.push(`/change-password?email=${data.requestChangePassword.email}`);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  // const [changePasswordMutation] = useChangePasswordMutation({
  //   onCompleted: () => {
  //     toast.success('Амжилттай солигдлоо');
  //     router.push('/login');
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const login = async ({ email, password }: LogInParams) => {
    console.log('Login called with:', { email, password });
    await loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  const signup = async ({ email, password, address, firstName, lastName, phone }: SignUpParams) => {
    await signupMutation({
      variables: {
        email,
        password,
        address,
        firstName,
        lastName,
        phone,
      },
    });
  };

  const signout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const requestChangePassword = async ({ email }: RequestChangePasswordParams) => {
    await requestChangePasswordMutation({
      variables: {
        input: {
          email,
        },
      },
    });
  };

  const changePassword = async ({ email, password, otp }: ChangePasswordParams) => {
    await changePasswordMutation({
      variables: {
        input: {
          email,
          password,
          otp,
        },
      },
    });
  };

  return <AuthContext.Provider value={{ login, signup, user, signout, requestChangePassword, changePassword }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
