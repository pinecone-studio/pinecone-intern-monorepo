'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

<<<<<<< HEAD
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
=======
const client = new ApolloClient({
  uri: process.env.BACKEND_URI,
  cache: new InMemoryCache(),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
>>>>>>> f64f174a8 (push)
