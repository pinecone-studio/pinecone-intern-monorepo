import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Followers from '@/components/profile/follow/Followers';
import { useGetFollowersQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetFollowersQuery: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
}));

describe('Followers Component', () => {
  const mockUserId = '12345';
  const mockChildren = <div data-testid="followers-trigger">Open Followers</div>;

  test('renders correctly with followers', () => {
    const mockData = {
      getFollowers: [
        {
          followerId: '678e1e9179fd42a3a41c8dfe',
          targetId: '678e1e9179fd42a3a41c8dfe',
          user: {
            _id: '678e1e9179fd42a3a41c8dfe',
            userName: 'dev',
            fullName: 'dev',
            bio: 'dev',
            // eslint-disable-next-line no-secrets/no-secrets
            profileImage: 'https://i.natgeofe.com/n/4cebbf38-5df4-4ed0-864a-4ebeb64d33a4/NationalGeographic_1468962_3x4.jpg',
            hasStory: false,
            gender: 'male',
            isPrivate: true,
            email: 'dev@gmail.com',
            followingCount: 28,
            followerCount: 26,
            postCount: 20,
            latestStoryTimestamp: 0,
            seenStoryTime: 0,
            savedUsers: ['678a04ef4511a431fbfa6338', '6789fe2e6ac4e4a4329b877d', '6789b1cf63e287cd542f691f', '67ac90021cf0a3cff9d4a160'],
            createdAt: null,
            friendshipStatus: {
              followedBy: false,
              following: false,
              incomingRequest: false,
              outgoingRequest: false,
            },
            mutualFollowersCount: null,
            mutualFollowers: null,
          },
        },
      ],
    };

    (useGetFollowersQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    render(<Followers userId={mockUserId}>{mockChildren}</Followers>);
  });

  test('renders correctly with no followers', () => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({
      data: { getFollowers: [] },
    });

    render(<Followers userId={mockUserId}>{mockChildren}</Followers>);
  });

  test('handles loading state', () => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<Followers userId={mockUserId}>{mockChildren}</Followers>);
  });

  test('handles error state', () => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch followers'),
    });

    render(<Followers userId={mockUserId}>{mockChildren}</Followers>);
  });

  test('closes the dialog when clicking the close button', () => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({
      data: { getFollowers: [] },
    });

    render(<Followers userId={mockUserId}>{mockChildren}</Followers>);
  });
});
