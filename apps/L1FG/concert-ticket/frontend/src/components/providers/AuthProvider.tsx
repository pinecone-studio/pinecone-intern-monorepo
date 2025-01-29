'use client';
import { useSignInMutation, useSignUpMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';

type SigninParams = {
  email: string;
  password: string;
};

type AuthContextType = {
  signin: (_params: SigninParams) => Promise<void>;
  signup: (_params: SigninParams) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [SignUpMutation] = useSignUpMutation({
    onCompleted: () => {
      toast.success('Бүртгэл амжилттай үүслээ');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const signup = async ({ email, password }: SigninParams) => {
    await SignUpMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };
  const [SignInMutation] = useSignInMutation({
    onCompleted: (data) => {
      const token = data.signIn.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data.signIn.user));
      toast.success('Амжилттай нэвтэрлээ', { autoClose: 2000 });
      router.push('/');
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const signin = async ({ email, password }: SigninParams) => {
    await SignInMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  return <AuthContext.Provider value={{ signin, signup }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
