'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { PropsWithChildren } from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

const uri = process.env.FEDERATION_ENDPOINT;

const getFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  return localStorage.getItem('token');
};

export const makeApolloClient = () => {
  const token = getFromLocalStorage();

  const httpLink = new HttpLink({
    uri,
    headers: {
      Authorization: `${token}`,
    },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
};

export const FederationProvider = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
