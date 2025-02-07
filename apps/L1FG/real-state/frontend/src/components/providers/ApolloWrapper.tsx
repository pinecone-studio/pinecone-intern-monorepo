'use client';

import { HttpLink } from '@apollo/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { setContext } from '@apollo/client/link/context';

const uri = process.env._BACKEND_URI ?? process.env.LOCAL_BACKEND_URI;

const makeClient = () => {
  const httpLink = new HttpLink({
    uri,
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
