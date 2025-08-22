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

  // Refresh hiih uyed ene ajillah yum.
    const token = localStorage.getItem('token');
    let userId: string | undefined;

    if (token) {
      try {
        const decodedToken: DecodedTokenType = jwtDecode(token);
        userId = decodedToken?.userId;
      } catch (err) {
        console.error('Invalid token');
      }
    }

    const { data, loading} = useGetUserQuery({
      variables: { id: userId || '' },
      skip: !userId,
    });

    useEffect(() => {
      if (data?.getUser) {
        const normalizedUser: AuthUser = {
          fullName: data.getUser.fullName,
          userName: data.getUser.userName,
          isPrivate: data.getUser.isPrivate ?? false,
          profileImage: data.getUser.profileImage ?? '',
          bio: data.getUser.bio ?? '',
          followers: data.getUser.followers.map((f) => ({
            _id: f._id,
            userName: f.userName,
            profileImage: f.profileImage ?? '',
          })),
          following: data.getUser.following.map((f) => ({
            _id: f._id,
            userName: f.userName,
            profileImage: f.profileImage ?? '',
          })),
          posts: data.getUser.posts.map((p) => ({
            _id: p._id,
            image: Array.isArray(p.image) ? p.image[0] ?? '' : p.image,
            text: p.description ?? '',
            createdAt: p.createdAt,
            likes: p.likes.map((like) => ({
              _id: like._id,
              user: {
                _id: like.userId._id,
                userName: like.userId.userName,
                profileImage: like.userId.profileImage ?? '',
              },
            })),
            comments: p.comments.map((comment) => ({
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

        setUser(normalizedUser);
      }
    }, [data]);

    if (loading) return <p>Loading...</p>;

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
