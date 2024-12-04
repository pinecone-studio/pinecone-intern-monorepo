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
