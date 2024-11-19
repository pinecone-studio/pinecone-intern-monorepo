'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const uri = process.env.BACKEND_URI ?? 'http://localhost:8000/api/graphql';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
