/* eslint-disable no-unused-vars */
'use client';

import { PropsWithChildren, useContext, createContext, useState, Dispatch, SetStateAction } from 'react';
import { useSignInMutation, useSignUpMutation } from '../../generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  handleSignUp: (emailOrPhoneNumber: string, password: string) => Promise<void>;
  handleSignIn: (emailOrPhoneNumber: string, password: string) => Promise<void>;
  creationLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [signUp, { loading: creationLoading }] = useSignUpMutation();
  const [signIn] = useSignInMutation();
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
      setIsLoggedIn(true);
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

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleSignIn,
        creationLoading,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
