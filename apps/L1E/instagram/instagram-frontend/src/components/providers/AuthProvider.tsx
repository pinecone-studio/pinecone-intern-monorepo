"use client";
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export type AuthUser = {
  id: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => void;
};

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id: _id
        email
      }
    }
  }
`;

type LoginMutationResult = {
  login: {
    token: string;
    user: AuthUser;
  };
};

type LoginMutationVars = {
  input: {
    email: string;
    password: string;
  };
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [executeLogin] = useMutation<LoginMutationResult, LoginMutationVars>(LOGIN_MUTATION);

  const login = async (email: string, password: string) => {
    const response = await executeLogin({ variables: { input: { email, password } } });
    const token = response.data?.login.token ?? '';
    const loggedInUser = response.data?.login.user ?? null;

    if (token && typeof window !== 'undefined') {
      window.localStorage.setItem('token', token);
    }
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('token');
    }
  };

  const value: AuthContextValue = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

