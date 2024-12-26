'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';

const uri = process.env.BACKEND_URI || 'http://localhost:4200/api/graphql';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const apolloClient = new ApolloClient({
      uri,
      cache: new InMemoryCache(),
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    setClient(apolloClient);
  }, []);
  if (!client) {
    return null;
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
