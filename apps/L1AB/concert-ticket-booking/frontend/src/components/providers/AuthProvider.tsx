'use client';
import { usePasswordRecoveryMutation, User, useRequestPasswordRecoveryMutation, useSignInUserMutation, useSignUpUserMutation, useVerifyOtpMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
};

type SignInParams = {
  email: string;
  password: string;
};

type RequestPasswordRecoveryParams = {
  email: string;
};

type VerifyOtpParams = {
  email: string;
  otp: string;
};

type PasswordRecoveryParams = {
  email: string;
  accessToken: string;
  password: string;
};

type AuthContextType = {
  signin: (_param: SignInParams) => void;
  signup: (_params: SignUpParams) => void;
  signout: () => void;
  requestPasswordRecovery: (_params: RequestPasswordRecoveryParams) => void;
  passwordRecovery: (_params: PasswordRecoveryParams) => void;
  verifyOtp: (_params: VerifyOtpParams) => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [signinMutation] = useSignInUserMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signInUser.token);
      setUser(data.signInUser.user);
      toast.success('Signin successful!', { autoClose: 2000 });

      const userRole = data.signInUser.user.role;
      console.log(userRole);

      if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
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
  const [requestPasswordRecoveryMutation] = useRequestPasswordRecoveryMutation({
    onCompleted: () => {
      toast.success('Амжилттай илгээлээ', { autoClose: 2000 });
    },
    onError: (error) => {
      toast.error(error.message, { autoClose: 2000 });
    },
  });

  const [verifyOtpMutation] = useVerifyOtpMutation({
    onCompleted: () => {
      toast.success('Амжилттай баталгаажлаа', { autoClose: 2000 });
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

  const signin = async ({ email, password }: SignInParams) => {
    await signinMutation({
      variables: {
        input: { email, password },
      },
    });
  };

  const signup = async ({ name, email, password, phone }: SignUpParams) => {
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

  const verifyOtp = async ({ email, otp }: VerifyOtpParams) => {
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

  return <AuthContext.Provider value={{ signin, signup, user, signout, requestPasswordRecovery, verifyOtp, passwordRecovery }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
