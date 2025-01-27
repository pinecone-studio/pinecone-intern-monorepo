import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Post from '@/components/profile/Post';
import { useGetPostsQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetPostsQuery: jest.fn(),
}));

describe('Post Component', () => {
  const mockUserId = '12345';

  test('renders correctly with posts', () => {
    const mockData = {
      getPosts: [
        { postImage: '/images/post1.jpg', _id: 1 },
        { postImage: '/images/post2.jpg', _id: 2 },
        { postImage: '/images/post3.jpg', _id: 3 },
      ],
    };

    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: mockData,
    });

    render(<Post userId={mockUserId} />);
  });

  test('renders correctly with no posts', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      data: { getPosts: [] },
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
        getPosts: [
          {
            postImage: [null],
            _id: 1,
          },
        ],
      },
    });
    render(<Post userId={mockUserId} />);
    expect(screen.queryByTestId('profile-story-1')).toBeNull();
  });
});
