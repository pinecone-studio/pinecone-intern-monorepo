'use client';
import {
  SignInUser,
  SignUpUser,
  useGetMeQuery,
  usePasswordRecoveryMutation,
  User,
  useRequestPasswordRecoveryMutation,
  useSignInUserMutation,
  useSignUpUserMutation,
  useVerifyOtpMutation,
  VerifyOtpInput,
} from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type RequestPasswordRecoveryParams = {
  email: string;
};

type PasswordRecoveryParams = {
  email: string;
  accessToken: string;
  password: string;
};

type AuthContextType = {
  signin: (_param: SignInUser) => void;
  signup: (_params: SignUpUser) => void;
  signout: () => void;
  requestPasswordRecovery: (_params: RequestPasswordRecoveryParams) => void;
  passwordRecovery: (_params: PasswordRecoveryParams) => void;
  verifyOtp: (_params: VerifyOtpInput) => void;
  user: User | null;
  loading: boolean;
  getMeLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { loading: getMeLoading } = useGetMeQuery({
    onCompleted: (data) => {
      setUser(data.getMe!);
    },
    onError: (error) => {
      console.error(error.message);
      setUser(null);
    },
    skip: !!user,
  });

  const [signinMutation] = useSignInUserMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signInUser.token);
      setUser(data.signInUser.user);
      toast.success('Signin successful!', { autoClose: 2000 });
      const userRole = data.signInUser.user.role;
      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      localStorage.setItem('theme', 'dark');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [signupMutation] = useSignUpUserMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUpUser.token);
      setUser(data.signUpUser.user);
      router.push('/');
      toast('Signup successful!', { autoClose: 2000 });
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2000 });
    },
  });
  const [requestPasswordRecoveryMutation, { loading }] = useRequestPasswordRecoveryMutation({
    onCompleted: (data) => {
      toast.success('Амжилттай илгээлээ', { autoClose: 2000 });
      router.push(`?step=2&email=${data.requestPasswordRecovery.email}`);
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2000 });
    },
  });

  const [verifyOtpMutation] = useVerifyOtpMutation({
    onCompleted: (data) => {
      toast.success('Амжилттай баталгаажлаа', { autoClose: 2000 });
      router.push(`?step=3&email=${data.verifyOtp.email}&token=${data.verifyOtp.accessToken}`);
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2000 });
    },
  });

  const [passwordRecoveryMutation] = usePasswordRecoveryMutation({
    onCompleted: () => {
      toast.success('Амжилттай солигдлоо', { autoClose: 2000 });
      router.push('/signin');
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2000 });
    },
  });

  const signin = async ({ email, password }: SignInUser) => {
    await signinMutation({
      variables: {
        input: { email, password },
      },
    });
  };

  const signup = async ({ name, email, password, phone }: SignUpUser) => {
    await signupMutation({
      variables: {
        input: { name, email, password, phone },
      },
    });
  };

  const signout = () => {
    localStorage.removeItem('token');
    router.push('/');
    toast.success('Successfully signed out', { autoClose: 2000 });
    setUser(null);
  };

  const requestPasswordRecovery = async ({ email }: RequestPasswordRecoveryParams) => {
    await requestPasswordRecoveryMutation({
      variables: { input: { email } },
    });
  };
  const verifyOtp = async ({ email, otp }: VerifyOtpInput) => {
    await verifyOtpMutation({
      variables: { input: { email, otp } },
    });
  };
  const passwordRecovery = async ({ email, accessToken, password }: PasswordRecoveryParams) => {
    await passwordRecoveryMutation({
      variables: {
        input: { email, accessToken, password },
      },
    });
  };
  return <AuthContext.Provider value={{ signin, signup, getMeLoading, user, loading, signout, requestPasswordRecovery, verifyOtp, passwordRecovery }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
