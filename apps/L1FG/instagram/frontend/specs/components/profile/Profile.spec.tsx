import { render, screen } from '@testing-library/react';
import { useRouter, useParams } from 'next/navigation';
import { MockedProvider } from '@apollo/client/testing';
import { Profile } from '@/components/profile/Profile';
import { GetUserTogetherDocument } from '@/generated';
import '@testing-library/jest-dom';
import { useAuth } from '@/components/providers/AuthProvider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('@/components/providers/AuthProvider', () => ({ useAuth: jest.fn().mockReturnValue({ userId: '12345' }) }));
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
            _id: '12345',
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
  const userWithOtherUserid = {
    request: {
      query: GetUserTogetherDocument,
      variables: { searchingUserId: '111' },
    },
    result: {
      data: {
        getUserTogether: {
          user: {
            _id: '12',
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
  it('Should render userProfile', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { _id: '12345' } });
    render(
      <MockedProvider mocks={[userWithPosts]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );
    expect(await screen.findByTestId('user-profile')).toBeInTheDocument();
  });
  it('Should render public profile', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { _id: '111' } });
    render(
      <MockedProvider mocks={[userWithOtherUserid]} addTypename={false}>
        <Profile />
      </MockedProvider>
    );
    expect(await screen.findByTestId('profile-visit-container')).toBeInTheDocument();
  });
});
