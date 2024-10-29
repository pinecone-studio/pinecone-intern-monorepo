import { makeApolloClient } from '../../common/apollo';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { PropsWithChildren } from 'react';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return <ApolloNextAppProvider makeClient={makeApolloClient}>{children}</ApolloNextAppProvider>;
};
