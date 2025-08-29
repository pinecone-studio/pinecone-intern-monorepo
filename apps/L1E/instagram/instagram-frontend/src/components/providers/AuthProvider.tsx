'use client';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { useGetUserQuery } from '@/generated';
import { AuthUser, DecodedTokenType, LOGIN_MUTATION } from '../Types';

export type AuthContextValue = {
  user: AuthUser | null;
  login: (_email: string, _password: string) => Promise<void>;
  logout: () => void;
};

export type LoginMutationResult = {
  login: {
    token: string;
    user: AuthUser;
  };
};

export type LoginMutationVars = {
  input: {
    email: string;
    password: string;
  };
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getTokenAndUserId() {
  if (typeof window === 'undefined') return { token: null, userId: undefined };
  const token = window.localStorage.getItem('token');
  console.log("getTokenAndUserId - token exists:", !!token);
  if (!token) return { token: null, userId: undefined };
  try {
    const decodedToken: any = jwtDecode(token);
    console.log("getTokenAndUserId - decoded token:", decodedToken);
    
    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiry = decodedToken.exp || decodedToken.iat + 3600; // Default 1 hour if no exp
    console.log("getTokenAndUserId - current time:", currentTime);
    console.log("getTokenAndUserId - token expiry:", tokenExpiry);
    console.log("getTokenAndUserId - token expired:", currentTime > tokenExpiry);
    
    return { token, userId: decodedToken?.userId };
  } catch {
    console.error('Invalid token');
    return { token: null, userId: undefined };
  }
}

function normalizeUser(data: any): AuthUser {
  return {
    fullName: data.fullName,
    userName: data.userName,
    isPrivate: data.isPrivate ?? false,
    profileImage: data.profileImage ?? '',
    bio: data.bio ?? '',
    followers: data.followers.map((f: any) => ({
      _id: f._id,
      userName: f.userName,
      profileImage: f.profileImage ?? '',
    })),
    following: data.following.map((f: any) => ({
      _id: f._id,
      userName: f.userName,
      profileImage: f.profileImage ?? '',
    })),
    posts: data.posts.map((p: any) => ({
      _id: p._id,
      image: Array.isArray(p.image) ? p.image[0] ?? '' : p.image,
      text: p.description ?? '',
      createdAt: p.createdAt,
      likes: p.likes.map((like: any) => ({
        _id: like._id,
        user: {
          _id: like.userId._id,
          userName: like.userId.userName,
          profileImage: like.userId.profileImage ?? '',
        },
      })),
      comments: p.comments.map((comment: any) => ({
        _id: comment._id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          _id: comment.userId._id,
          userName: comment.userId.userName,
          profileImage: comment.userId.profileImage ?? '',
        },
      })),
    })),
  };
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [executeLogin] = useMutation<LoginMutationResult, LoginMutationVars>(LOGIN_MUTATION);

  const { userId } = getTokenAndUserId();

  const { data, loading } = useGetUserQuery({
    variables: { id: userId || '' },
    skip: !userId,
  });

  useEffect(() => {
    if (data?.getUser) {
      setUser(normalizeUser(data.getUser));
    }
  }, [data]);

  const login = async (email: string, password: string) => {
    console.log("Login attempt for email:", email);
    const response = await executeLogin({ variables: { input: { email, password } } });
    const token = response.data?.login.token ?? '';
    const loggedInUser = response.data?.login.user ?? null;

    console.log("Login response - token exists:", !!token);
    console.log("Login response - user exists:", !!loggedInUser);

    if (token && typeof window !== 'undefined') {
      window.localStorage.setItem('token', token);
      console.log("Token stored in localStorage");
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

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
