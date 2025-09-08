// app/Apollo.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from 'utils/apollo-client';

interface ApolloProps {
  children: React.ReactNode;
}

const Apollo = ({ children }: ApolloProps) => {
  const client = initializeApollo();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
