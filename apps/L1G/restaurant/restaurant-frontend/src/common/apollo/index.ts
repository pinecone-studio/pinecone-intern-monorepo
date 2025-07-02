'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.BACKEND_URI || 'http://localhost:4200/api/graphql';

export const makeApolloClient = () => {
  const httpLink = new HttpLink({
    uri,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: typeof window === 'undefined' ? ApolloLink.from([httpLink]) : httpLink,
  });
};
