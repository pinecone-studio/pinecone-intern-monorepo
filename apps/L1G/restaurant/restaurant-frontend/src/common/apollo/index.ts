'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const makeApolloClient = () => {
  const uri = process.env.BACKEND_URI ?? 'http://localhost:4200/api/graphql';

  const httpLink = new HttpLink({
    uri,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === 'undefined' ? ApolloLink.from([httpLink]) : httpLink,
  });
};
