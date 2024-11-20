'use client';

import { PropsWithChildren } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const uri = process.env.API_URL ?? 'http://localhost:8000/api/graphql';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
