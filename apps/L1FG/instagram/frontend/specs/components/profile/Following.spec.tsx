import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Following from '@/components/profile/Following';
import { useGetFollowingQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetFollowingQuery: jest.fn(),
}));

// Mock child components
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
          targetId: {
            fullName: 'John Doe',
            userName: '@johndoe',
          },
        },
        {
          targetId: {
            fullName: 'Jane Smith',
            userName: '@janesmith',
          },
        },
      ],
    };

    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    render(<Following userId={mockUserId}>{mockChildren}</Following>);

    // Trigger the dialog
  });

  test('renders correctly with no following users', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: { getFollowing: [] },
    });

    render(<Following userId={mockUserId}>{mockChildren}</Following>);

    // Trigger the dialog
    fireEvent.click(screen.getByTestId('following-trigger'));
  });

  test('handles loading state', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    });

    // Trigger the dialog
  });

  test('handles error state', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Error fetching following list'),
    });

    // Trigger the dialog

    // Add additional checks for error UI if applicable
  });

  test('closes the dialog on clicking the close button', () => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({
      data: { getFollowing: [] },
    });
  });
});
