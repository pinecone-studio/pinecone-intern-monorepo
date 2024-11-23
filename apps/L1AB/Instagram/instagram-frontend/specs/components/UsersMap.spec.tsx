import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllUsersDocument } from '@/generated';
import { UsersMap } from '@/components/UsersMap';

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

describe('UsersMap', () => {
  it('should render successfully', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[mock]}>
        <UsersMap />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getAllByTestId('username')[0]);
    });
  });
});
