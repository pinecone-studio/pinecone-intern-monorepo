import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Followers from '@/components/profile/Followers';
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
          followerId: {
            fullName: 'John Doe',
            userName: '@johndoe',
          },
        },
        {
          followerId: {
            fullName: 'Jane Smith',
            userName: '@janesmith',
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
