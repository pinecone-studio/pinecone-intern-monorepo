'use client';
import { useChangePasswordInputMutation, useGetMeLazyQuery, useLoginMutation, User, useRegisterMutation, useRequestChangePasswordInputMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdmin?: boolean;
};

type RequestChangePasswordParams = {
  email: string;
};

type ChangePasswordParams = {
  email: string;
  password: string;
  otp: string;
};

type AuthContextType = {
  signin: (_params: SignInParams) => Promise<void>;
  signup: (_params: SignUpParams) => Promise<void>;
  signout: () => void;
  requestChangePassword: (_params: RequestChangePasswordParams) => Promise<void>;
  changePassword: (_params: ChangePasswordParams) => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [getMe] = useGetMeLazyQuery({
    onCompleted: (data) => {
      setUser(data.getMe);
    },
  });

  const [signinMutation] = useLoginMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
      setUser(data.login.user);
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [signupMutation] = useRegisterMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.register.token);
      setUser(data?.register.user);
      router.push('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [requestChangePasswordMutation] = useRequestChangePasswordInputMutation({
    onCompleted: (data) => {
      toast.success('Амжилттай илгээлээ');
      router.push(`/change-password?email=${data.requestChangePassword.email}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [changePasswordMutation] = useChangePasswordInputMutation({
    onCompleted: () => {
      toast.success('Амжилттай солигдлоо');
      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
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

  const signup = async ({ name, email, phone, password, isAdmin }: SignUpParams) => {
    await signupMutation({
      variables: {
        input: {
          name,
          email,
          password,
          phone,
          isAdmin,
        },
      },
    });
  };

  const requestChangePassword = async ({ email }: RequestChangePasswordParams) => {
    await requestChangePasswordMutation({
      variables: {
        input: {
          email,
        },
      },
    });
  };

  const changePassword = async ({ email, password, otp }: ChangePasswordParams) => {
    await changePasswordMutation({
      variables: {
        input: {
          email,
          password,
          otp,
        },
      },
    });
  };

  const signout = async () => {
    localStorage.removeItem('token');
    router.push('/');
    setUser(null);
  };

  useEffect(() => {
    getMe();
  }, [getMe]);

  const values = { user, signin, signup, signout, requestChangePassword, changePassword };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
