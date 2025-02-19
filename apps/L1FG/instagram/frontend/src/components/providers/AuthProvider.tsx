'use client';

import { useCreateUserMutation, useGetUserLazyQuery, useLoginMutation, UserWithoutPassword } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
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
  logout: (_client: any) => void;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const router = useRouter();
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
        autoClose: 1000,
      });
      router.push('/');
    },
    onError: (error) => {
      toast.error(`${error.message}`, {
        autoClose: 1000,
      });
    },
  });
  const [createUserMutation] = useCreateUserMutation({
    onCompleted: () => {
      toast.success('Амжилттай бүртгэгдлээ', { autoClose: 1000 });
      router.push('/login');
    },
    onError: (error) => {
      toast.error(`${error.message}`, { autoClose: 1000 });
    },
  });

  const signin = async ({ email, password }: SignInParams) => {
    await loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
  const signup = async ({ email, password, fullName, userName }: SignUpParams) => {
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
  };
  const logout = async (client: any) => {
    router.push('/login');
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;Samesite=Lax;Secure;`;
    localStorage.removeItem('token');
    setUser(null);
    await client.resetStore();
  };

  useEffect(() => {
    getUserQuery();
  }, [getUserQuery]);

  return <AuthContext.Provider value={{ signin, signup, user, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
