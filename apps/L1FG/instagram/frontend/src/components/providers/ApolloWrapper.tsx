'use client';

import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { setContext } from '@apollo/client/link/context';
const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.LOCAL_BACKEND_URI || process.env.BACKEND_URI,
    fetchOptions: { cache: 'no-store' },
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ?? '',
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={makeClient()}>{children}</ApolloProvider>;
};
