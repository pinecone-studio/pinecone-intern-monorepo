import { ProfileHeader } from '@/app/(main)/_components/ProfileHeader';
import { GetUserDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockUserEmail = 'testuser@example.com';

const mocks = [
  {
    request: {
      query: GetUserDocument,
      variables: {
        id: '682207ae2c5870fba2e6da4c',
      },
    },
    result: {
      data: {
        getUser: {
          __typename: 'User',
          email: mockUserEmail,
        },
      },
    },
  },
];

describe('ProfileHeader', () => {
  it('renders user email from useGetUserQuery', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfileHeader />
      </MockedProvider>
    );

    expect(screen.getByText('Hi,')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockUserEmail)).toBeInTheDocument();
    });
  });
});
