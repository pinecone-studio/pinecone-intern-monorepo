/* eslint-disable */
'use client';
const jwt = require('jsonwebtoken');
import { PropsWithChildren, useContext, createContext, useEffect, useState } from 'react';
import { useReportSignInMutation } from '@/generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  handleSignIn: (email: string, password: string) => Promise<void>;
  loading: boolean;
  access: string;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [reportSignIn, { loading }] = useReportSignInMutation();
  const [access, setAccess] = useState('');

  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data: signInData } = await reportSignIn({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const token = signInData?.reportSignIn.token;
      localStorage.setItem('token', token || '');
      const data = jwt.decode(token);
      setAccess(data?.role);
      router.push('/dashboard');
      toast.success(signInData?.reportSignIn.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error('Sign in error has occurred', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const data = jwt.decode(token);
    setAccess(data?.role);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        loading,
        access,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
