import { ApolloWrapper } from '../../../src/components';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';

jest.mock('@apollo/experimental-nextjs-app-support/ssr', () => ({
  ApolloNextAppProvider: ({ children }: PropsWithChildren) => <>{children}</>,
}));

describe('ApolloProvider', () => {
  it('should render', async () => {
    render(<ApolloWrapper />);
  });
});
