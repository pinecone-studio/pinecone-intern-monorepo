/* eslint-disable no-unused-vars */
'use client';

import { PropsWithChildren, useContext, createContext } from 'react';
import { useLessonSignInMutation, useLessonSignUpMutation } from '@/generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';
type AuthContextType = {
  handleSignUp: (email: string, phoneNumber: string, password: string) => Promise<void>;
  handleSignIn: (emailOrPhoneNumber: string, password: string) => Promise<void>;
  signUpLoading: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [lessonSignUp, { loading: signUpLoading }] = useLessonSignUpMutation();
  const [lessonSignIn, { loading }] = useLessonSignInMutation();
  const router = useRouter();

  const handleSignUp = async (email: string, phoneNumber: string, password: string) => {
    try {
      const { data: signUpData } = await lessonSignUp({
        variables: {
          email,
          phoneNumber,
          password,
        },
      });
      router.push('/sign-in');
      toast.success(signUpData?.lessonSignUp.message, {
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
      const { data: signInData } = await lessonSignIn({
        variables: {
          emailOrPhoneNumber,
          password,
        },
      });
      const token = signInData?.lessonSignIn.token;
      localStorage.setItem('token', token || '');
      router.push('/dashboard');
      toast.success(signInData?.lessonSignIn.message, {
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
        signUpLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
