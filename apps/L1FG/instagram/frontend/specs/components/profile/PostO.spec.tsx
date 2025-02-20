import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetPostsQuery } from '@/generated';
import Post from '@/features/profile-post/Post';
import { mockGetPosts } from './mock';

jest.mock('@/generated', () => ({
  useGetPostsQuery: jest.fn(),
}));

describe('Post Component', () => {
  const mockUserId = '12345';

  test('renders correctly with posts', () => {
    const mockData = {
      getPosts: mockGetPosts,
    };

    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    render(<Post userId={mockUserId} />);
  });

  test('renders correctly with no posts', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: {
        getPosts: {
          edges: [],
        },
      },
    });

    render(<Post userId={mockUserId} />);
  });

  test('handles loading state', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
    });

    render(<Post userId={mockUserId} />);
  });

  test('handles error state', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Error fetching posts'),
    });
  });
  test('Should handle image null', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: {
        getPosts: {
          edges: [
            {
              node: {
                postImage: [null],
                _id: 1,
              },
            },
          ],
        },
      },
    });
    render(<Post userId={mockUserId} />);
    expect(screen.queryByTestId('profile-story-1')).toBeNull();
  });
});
