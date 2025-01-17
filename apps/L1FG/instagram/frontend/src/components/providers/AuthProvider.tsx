'use client';

import { useCreateUserMutation, useGetUserLazyQuery, useLoginMutation, UserWithoutPassword } from '@/generated';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
type SignInParams = {
  email: string;
  password: string;
};
type SignUpParams = {
  email: string;
  password: string;
  fullName: string;
  userName: string;
};
type AuthContextType = {
  signin: (_params: SignInParams) => void;
  signup: (_params: SignUpParams) => void;
  user: UserWithoutPassword | null;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [getUserQuery] = useGetUserLazyQuery({
    onCompleted: (data) => {
      setUser(data.getUser as UserWithoutPassword);
    },
  });
  const [loginMutation] = useLoginMutation({
    onCompleted: (data) => {
      const expire = data.login.exp;
      const token = data.login.token;
      const expiresAt = new Date(expire * 1000).toUTCString();
      document.cookie = `token=${token};expires=${expiresAt};Samesite=Lax;Secure;`;
      setUser(data.login.user as UserWithoutPassword);
      localStorage.setItem('token', token);
      toast.success('Амжилттай нэвтэрлээ', {
        autoClose: 2000,
      });
    },
    onError: (error) => {
      toast.error(`Нэвтрэлт амжилтгүй . onError алдаа : ${error.message}`, {
        autoClose: 2000,
      });
    },
  });
  const [createUserMutation] = useCreateUserMutation({
    onCompleted: (_) => {
      toast.success('Хэрэглэгч амжилттай бүртгэгдлээ', { autoClose: 2000 });
    },
    onError: (_) => {
      toast.error(`Бүртгэл амжилтгүй`, { autoClose: 2000 });
    },
  });

  const signin = useCallback(
    async ({ email, password }: SignInParams) => {
      try {
        await loginMutation({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
      } catch (error) {
        toast.error(`Нэвтрэл амжилтгүй . Try catch -ийн алдаа :${error}`, {
          autoClose: 2000,
        });
      }
    },
    [loginMutation]
  );
  const signup = useCallback(
    async ({ email, password, fullName, userName }: SignUpParams) => {
      try {
        await createUserMutation({
          variables: {
            input: {
              email: email,
              password: password,
              fullName: fullName,
              userName: userName,
            },
          },
        });
      } catch (error) {
        toast.error(`Aлдаа ${error}`, { autoClose: 2000 });
      }
    },
    [createUserMutation]
  );
  useEffect(() => {
    getUserQuery();
  }, [getUserQuery]);
  return <AuthContext.Provider value={{ signin, signup, user }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
