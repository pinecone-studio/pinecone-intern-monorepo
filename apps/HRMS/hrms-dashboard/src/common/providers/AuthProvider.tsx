/* eslint-disable */
'use client';
const jwt = require('jsonwebtoken');
import { PropsWithChildren, useContext, createContext, useEffect, useState } from 'react';
import { useLoginMutation } from '@/generated';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/navigation';
type AuthContextType = {
  handleSignIn: (email: string, password: string) => Promise<void>;
  access: string;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
 const [login] = useLoginMutation();
  const [access, setAccess] = useState('');
const router = useRouter();

 

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { data: signInData } = await login({
        variables: {
          email,
          password,
        },
      });
      const token = signInData?.lessonSignIn.token;
      localStorage.setItem('token', token || '');
      const data = jwt.decode(token);
      setAccess(data?.role);
      router.push('/');
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    const data = jwt.decode(token);
    setAccess(data?.role || 'ADMIN');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
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