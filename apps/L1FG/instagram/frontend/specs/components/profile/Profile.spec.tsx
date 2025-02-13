import { render, screen } from '@testing-library/react';
import { useRouter, useParams } from 'next/navigation';
import { MockedProvider } from '@apollo/client/testing';
import { Profile } from '@/components/profile/Profile';
import { GetUserTogetherDocument } from '@/generated';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('Profile Component', () => {
  const mockUserId = '12345';
  const push = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ userId: mockUserId });
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  const userWithPosts = {
    request: {
      query: GetUserTogetherDocument,
      variables: { searchingUserId: '12345' },
    },
    result: {
      data: {
        getUserTogether: {
          user: {
            _id: 'idf',
            userName: 'john_doe',
            fullName: 'John Doe',
            bio: 'Software Engineer',
            profileImage: 'http:/image',
            hasStory: false,
            gender: 'male',
            isPrivate: false,
            email: 'john@gmail.com',
            followingCount: 50,
            followerCount: 100,
            postCount: 5,
            friendshipStatus: {
              followedBy: false,
              following: false,
              incomingRequest: false,
              outgoingRequest: false,
            },
          },
          viewer: {
            _id: 'viewer',
            userName: 'viewer',
            fullName: 'viewer',
            bio: 'hi ',
            profileImage: 'http:/image',
          },
        },
      },
    },
  };

  it('Should render post', async () => {
    render(
      <MockedProvider mocks={[userWithPosts]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );
    expect(await screen.findByTestId('profile-visit-container')).toBeInTheDocument();
  });
});
