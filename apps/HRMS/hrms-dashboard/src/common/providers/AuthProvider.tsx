/* eslint-disable no-unused-vars */
'use client'
import { PropsWithChildren, useContext, createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';
import { setCookie, parseCookies } from 'nookies';
import { useLoginMutation } from '@/generated';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  handleSignIn: (emailorPhone: string) => Promise<void>;
  loginLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [login, { loading: loginLoading }] = useLoginMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const router = useRouter()
  const handleSignIn = async (emailorPhone: string) => {
    try {
      const { data: loginData } = await login({
        variables: {
            emailorPhone
        },
      });
      const token = loginData?.login.token;
      setCookie(null, 'token', token || '', {
        maxAge: 3600
      });
      setIsLoggedIn(true);
      toast.success(loginData?.login.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      router.push('/')
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
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
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
