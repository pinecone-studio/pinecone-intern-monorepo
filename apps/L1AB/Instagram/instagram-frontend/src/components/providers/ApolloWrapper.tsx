'use client';

import { PropsWithChildren } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const uri = process.env.BACKEND_URI || 'http://localhost:4200/api/graphql';

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
