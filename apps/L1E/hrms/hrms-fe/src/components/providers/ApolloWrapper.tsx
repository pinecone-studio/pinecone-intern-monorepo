'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';

const client = new ApolloClient({
  uri: process.env.BACKEND_URI || 'http://localhost:4200/api/graphql',
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </ApolloProvider>
  );
};
