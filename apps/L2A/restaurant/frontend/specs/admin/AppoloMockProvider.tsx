import { MockedProvider } from '@apollo/client/testing';

export const withApolloProvider = (ui: React.ReactElement, mocks = []) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>
  );
};
