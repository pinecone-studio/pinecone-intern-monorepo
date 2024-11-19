'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const uri = process.env.BACKEND_URI ?? 'http://localhost:8000/api/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
