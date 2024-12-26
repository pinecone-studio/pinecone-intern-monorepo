'use client';
import { PropsWithChildren } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri: process.env.BACKEND_URI || 'http://localhost:4200/api/graphql',
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => <ApolloProvider client={client}>{children}</ApolloProvider>;

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
export const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
