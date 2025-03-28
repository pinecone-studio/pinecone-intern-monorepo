'use client';

import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'sonner';
import { useSignInMutation, User } from '@/generated';

type SignInParams = {
  email: string;
  password: string;
};

type AuthContextType = {
  signin: (_params: SignInParams) => void;
  user: User | null;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [signinMutation] = useSignInMutation({
    onCompleted: (data) => {
      if (data?.signIn?.token && data?.signIn?.user) {
        localStorage.setItem('token', data.signIn.token);
        localStorage.setItem('user', JSON.stringify(data.signIn.user));
        setUser(data.signIn.user);
        router.push('/');
      } else {
        toast.error('Amjiltgui bolloo dahin oroldono uu!');
      }
    },
    onError: (error) => {
      toast.error(`${error.message}`, {
        style: { backgroundColor: 'red', color: 'white' },
      });
    },
  });

  const signin = async ({ email, password }: SignInParams) => {
    await signinMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
    toast.success('Successfully logged out', {
      style: { backgroundColor: 'green', color: 'white' },
    });
  };

  return <AuthContext.Provider value={{ signin, signout, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
