/* eslint-disable no-unused-vars */

'use client';

import { PropsWithChildren, useContext, createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { useSignInMutation, useSignUpMutation } from '../../generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';

type AuthContextType = {
  handleSignUp: (emailOrPhoneNumber: string, password: string) => Promise<void>;
  handleSignIn: (emailOrPhoneNumber: string, password: string) => Promise<void>;
  signUpLoading: boolean;
  loginLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [signUp, { loading: signUpLoading }] = useSignUpMutation();
  const [signIn, { loading: loginLoading }] = useSignInMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = async (emailOrPhoneNumber: string, password: string) => {
    const emailOrPhone = emailOrPhoneNumber.includes('@') ? { email: emailOrPhoneNumber } : { phoneNumber: emailOrPhoneNumber };

    try {
      const { data: signUpData } = await signUp({
        variables: {
          email: '',
          phoneNumber: '',
          password,
          ...emailOrPhone,
        },
      });

      toast.success(signUpData?.signUp.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.graphQLErrors[0].message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleSignIn = async (emailOrPhoneNumber: string, password: string) => {
    try {
      const { data: signInData } = await signIn({
        variables: {
          emailOrPhoneNumber,
          password,
        },
      });
      const token = signInData?.signIn.token;
      localStorage.setItem('token', token || '');
      toast.success(signInData?.signIn.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.graphQLErrors[0].message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleSignIn,
        signUpLoading,
        isLoggedIn,
        setIsLoggedIn,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
