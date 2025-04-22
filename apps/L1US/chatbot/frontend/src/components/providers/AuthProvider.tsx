'use client';

import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { useLoginUserMutation, LoginUserMutation, useRegisterUserMutation, RegisterUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/common/AuthTokenUtil';

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

type AuthUser = RegisterUserMutation['registerUser']['user'] & {
  sessionToken: string;
};

type AuthContextType = {
  user: AuthUser | null;
  error: string | null;
  signin: (_params: SignInParams) => void;
  signup: (_params: SignUpParams) => void;
  logout: () => void;
  loading: boolean;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) throw new Error('no user');
      const stored: AuthUser = JSON.parse(raw);
      if (!stored.sessionToken || isTokenExpired(stored.sessionToken)) {
        throw new Error('token expired');
      }
      setUser(stored);
      setError(null);
    } catch (parseError) {
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const [loginUser] = useLoginUserMutation({
    onCompleted: (data: LoginUserMutation) => {
      const authUser: AuthUser = {
        ...data.loginUser.user,
        sessionToken: data.loginUser.sessionToken,
      };
      localStorage.setItem('user', JSON.stringify(authUser));
      setUser(authUser);
      setError(null);
      setLoading(false);
      router.push('/');
    },
    onError: (error) => {
      console.log('Login error: ', error.message);
      localStorage.removeItem('user');
      setError(error.message);
      setUser(null);
      setLoading(false);
    },
  });

  const [registerUser] = useRegisterUserMutation({
    onCompleted: (data: RegisterUserMutation) => {
      const authUser: AuthUser = {
        ...data.registerUser.user,
        sessionToken: data.registerUser.sessionToken,
      };
      localStorage.setItem('user', JSON.stringify(authUser));
      setUser(authUser);
      setError(null);
      setLoading(false);
      router.push('/');
    },
    onError: (error) => {
      console.log('Signup error: ', error.message);
      localStorage.removeItem('user');
      setError(error.message);
      setUser(null);
      setLoading(false);
    },
  });

  const signin = async ({ email, password }: SignInParams) => {
    setError(null);
    setLoading(true);
    await loginUser({
      variables: { input: { email, password } },
    });
  };

  const signup = async ({ username, email, password }: SignUpParams) => {
    setError(null);
    setLoading(true);
    await registerUser({
      variables: { input: { username, email, password } },
    });
  };

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
    setLoading(false);
    router.push('/');
  }, [router]);

  const clearError = useCallback(() => setError(null), []);

  return <AuthContext.Provider value={{ error, user, loading, signin, signup, logout, clearError }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
