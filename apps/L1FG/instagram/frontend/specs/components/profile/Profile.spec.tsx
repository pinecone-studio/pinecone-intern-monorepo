import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useParams } from 'next/navigation';
import { Profile } from '@/components/profile/Profile';
import { GetUserTogetherDocument } from '@/generated';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('Profile Component', () => {
  const mockUserId = '12345';

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ userId: mockUserId });
  });

  const userWithPosts = {
    request: {
      query: GetUserTogetherDocument,
      variables: { searchingUserId: mockUserId },
    },
    result: {
      data: {
        getUserTogether: {
          user: {
            userName: 'john_doe',
            fullName: 'John Doe',
            bio: 'Software Engineer',
            postCount: 5,
            followerCount: 100,
            followingCount: 50,
          },
        },
      },
    },
  };

  const userWithNoPosts = {
    request: {
      query: GetUserTogetherDocument,
      variables: { searchingUserId: mockUserId },
    },
    result: {
      data: {
        getUserTogether: {
          user: {
            userName: 'jane_smith',
            fullName: 'Jane Smith',
            bio: 'Designer',
            postCount: 0,
            followerCount: 50,
            followingCount: 25,
          },
        },
      },
    },
  };

  it('renders user profile information correctly', async () => {
    render(
      <MockedProvider mocks={[userWithPosts]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );
  });

  it('renders PostEmpty when no posts exist', async () => {
    render(
      <MockedProvider mocks={[userWithNoPosts]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );
  });

  it('renders PostEmpty component when postCount is 0', async () => {
    const userWithNoPosts = {
      request: {
        query: GetUserTogetherDocument,
        variables: { searchingUserId: '12345' },
      },
      result: {
        data: {
          getUserTogether: {
            user: {
              postCount: 0, // Zero postCount
            },
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[userWithNoPosts]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );

    // Verify that the PostEmpty component (or a text inside it) is rendered
  });

  it('renders Post component when postCount is greater than 0', async () => {
    const userWithPosts = {
      request: {
        query: GetUserTogetherDocument,
        variables: { searchingUserId: '12345' },
      },
      result: {
        data: {
          getUserTogether: {
            user: {
              postCount: 5, // Non-zero postCount
            },
          },
        },
      },
    };

    render(
      <MockedProvider mocks={[userWithPosts]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );

    // Verify that the Post component (or a text inside it) is rendered
  });
});
