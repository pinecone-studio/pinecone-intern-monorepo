'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Suspense } from 'react';

const client = new ApolloClient({
  uri: process.env.LOCAL_BACKEND_URI || process.env.BACKEND_URI,
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </ApolloProvider>
  );
};
