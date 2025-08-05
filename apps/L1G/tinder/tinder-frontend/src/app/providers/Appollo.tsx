'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface ApolloProps {
  children: React.ReactNode;
}

const Apollo = ({ children }: ApolloProps) => {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URI,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
