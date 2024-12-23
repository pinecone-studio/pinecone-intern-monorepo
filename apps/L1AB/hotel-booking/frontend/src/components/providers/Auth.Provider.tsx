'use client';

import { useGetMeQuery, useSignInMutation } from '@/generated';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SignInForm = {
  email: string;
  password: string;
};

type User = {
  _id: string;
  email: string;
  phone?: string | null;
  isAdmin: boolean;
};

type AuthContextType = {
  signin: (_params: SignInForm) => Promise<void>;
  signout: () => void;
  signInLoading: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useGetMeQuery({
    skip: !!user,
    onCompleted: (data) => {
      setUser(data.getMe!);
    },
    onError: (error) => {
      console.error('Error fetching user:', error.message);
    },
  });
  const [signinMutation, { loading: signInLoading }] = useSignInMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn.token);
      setUser(data.signIn.user);
      if (data.signIn.user.isAdmin === true) {
        router.push('/admin/hotels');
      } else {
        router.push('/');
      }
      toast.success('Sign-in successful!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const signin = async ({ email, password }: SignInForm) => {
    await signinMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
  console.log(user);
  const signout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
    toast.success('Successfully signed out.');
  };

  return <AuthContext.Provider value={{ signin, signout, user, signInLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
