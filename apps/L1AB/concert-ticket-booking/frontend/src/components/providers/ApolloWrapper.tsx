'use client';

import { PropsWithChildren } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const uri = process.env.BACKEND_URI || 'http://localhost:4200/api/graphql';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
