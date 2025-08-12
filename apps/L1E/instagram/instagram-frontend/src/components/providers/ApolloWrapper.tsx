"use client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { PropsWithChildren } from 'react';

const uri = process.env.BACKEND_URI ?? 'http://localhost:8000/api/graphql';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const httpLink = createHttpLink({ uri });
  const authLink = setContext((_, { headers }) => {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem('token');
    }
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};