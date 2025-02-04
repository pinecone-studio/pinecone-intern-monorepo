'use client';
import { useSignInMutation, useSignUpMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { useState, useContext, createContext, useEffect } from 'react';
import { useAlert } from '@/components/providers/AlertProvider';

type SigninParams = { email: string; password: string };
type User = { email: string };
type AuthContextType = {
  user: User | null;
  signin: (_params: SigninParams) => Promise<void>;
  signup: (_params: SigninParams) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [SignUpMutation] = useSignUpMutation({
    onCompleted: () => {
      showAlert('success', 'Бүртгэл амжилттай үүслээ');
      router.push('/signin');
    },
    onError: (error) => {
      showAlert('error', error.message);
    },
  });

  const signup = async ({ email, password }: SigninParams) => {
    await SignUpMutation({ variables: { input: { email, password } } });
  };

  const [SignInMutation] = useSignInMutation({
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn.token);
      localStorage.setItem('user', JSON.stringify(data.signIn.user));
      setUser(data.signIn.user);
      showAlert('success', 'Амжилттай нэвтэрлээ');
      router.push('/');
    },
    onError: (error) => {
      showAlert('error', error.message);
    },
  });

  const signin = async ({ email, password }: SigninParams) => {
    await SignInMutation({ variables: { input: { email, password } } });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    showAlert('warning', 'Та гарлаа');
    router.push('/signin');
  };

  return <AuthContext.Provider value={{ user, signin, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
