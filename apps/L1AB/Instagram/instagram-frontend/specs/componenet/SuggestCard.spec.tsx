import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SuggestCard } from '@/components/SuggestCard';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllUsersDocument } from '@/generated';

const mock: MockedResponse = {
  request: {
    query: GetAllUsersDocument,
  },
  result: {
    data: {
      getAllUsers: [
        {
          username: 'boldooo',
          id: '1',
        },
      ],
    },
  },
  delay: 200,
};

describe('SuggestCard', () => {
  it('sould render successfully', async () => {
    render(
      <MockedProvider mocks={[mock]}>
        <SuggestCard />
      </MockedProvider>
    );
  });
});
