"use client";
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export type AuthUser = {
  fullName: string,
  userName: string,
  isPrivate: boolean,
  profileImage: string,
  bio: string,
  followers: {
    _id: string,
    userName: string,
    profileImage: string
  }[],
  following: {
    _id: string,
    userName: string,
    profileImage: string
  }[],
  posts: {
    _id: string,
    image: string,
    description: string,
    createdAt: string,
    likes: {
      _id: string,
      user: {
        _id: string,
        userName: string,
        profileImage: string
      }
    }[],
    comments: {
      _id: string,
      text: string,
      createdAt: string,
      user: {
        _id: string,
        userName: string,
        profileImage: string
      }
    }[]
  }[]
};
export type AuthUserResponse = {
  user: AuthUser;
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
      fullName
      userName
      isPrivate
      profileImage
      bio
      followers {
        _id
        userName
        profileImage
      }
      following {
        _id
        userName
        profileImage
      }
      posts {
        _id
        image
        description
        createdAt
        likes {
          _id
          userId {
            _id
            userName
            profileImage
          }
        }
        comments {
          _id
          text
          createdAt
          userId {
            _id
            userName
            profileImage
          }
        }
        image
      }
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

