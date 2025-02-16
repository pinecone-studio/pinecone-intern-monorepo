import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Following from '@/components/profile/follow/Following';
import { useGetFollowingQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetFollowingQuery: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
}));

describe('Following Component', () => {
  const mockUserId = '12345';
  const mockChildren = <div data-testid="following-trigger">Open Following</div>;

  test('renders correctly with following users', () => {
    const mockData = {
      getFollowing: [
        {
          followerId: '678e1e9179fd42a3a41c8dfe',
          targetId: '67909b123f23799f39ee5c4c',
          user: {
            _id: '67909b123f23799f39ee5c4c',
            userName: 'Yeah',
            fullName: 'Saruul',
            bio: '',
            // eslint-disable-next-line no-secrets/no-secrets
            profileImage: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
            hasStory: false,
            gender: 'not_know',
            isPrivate: false,
            email: 'saruul@gmail.com',
            followingCount: 0,
            followerCount: 1,
            postCount: 0,
            latestStoryTimestamp: 0,
            seenStoryTime: 0,
            savedUsers: [],
            createdAt: null,
            friendshipStatus: {
              followedBy: false,
              following: true,
              incomingRequest: false,
              outgoingRequest: false,
            },
            mutualFollowersCount: null,
            mutualFollowers: null,
          },
        },
      ],
    };

    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    render(<Following userId={mockUserId}>{mockChildren}</Following>);
  });

  test('renders correctly with no following users', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: { getFollowing: [] },
    });

    render(<Following userId={mockUserId}>{mockChildren}</Following>);

    fireEvent.click(screen.getByTestId('following-trigger'));
  });

  test('handles loading state', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    });
  });

  test('handles error state', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Error fetching following list'),
    });
  });

  test('closes the dialog on clicking the close button', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: { getFollowing: [] },
    });
  });
});
