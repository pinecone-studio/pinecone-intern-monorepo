/* eslint-disable no-unused-vars */
'use client';

import { PropsWithChildren, useContext, createContext } from 'react';
import { useSignUpMutation } from '../../generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
type AuthContextType = {
  handleSignUp: (emailOrPhoneNumber: string, password: string) => Promise<void>;
  signUpLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [signUp, { loading: signUpLoading }] = useSignUpMutation();

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
  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        signUpLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
