import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import ProfilePostsSection, { ReactionContainer } from '@/components/ProfilePostsSection';

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }) => <img src={src} alt={alt} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

import { useGetAllSavedPostsQuery, useGetCommentsByPostIdQuery, useGetLikesByPostIdQuery, useGetSavedByPostIdQuery } from '@/generated';
import { useSearchParams } from 'next/navigation';

jest.mock('@/generated', () => ({
  useGetAllSavedPostsQuery: jest.fn(),
  useGetLikesByPostIdQuery: jest.fn(),
  useGetCommentsByPostIdQuery: jest.fn(),
  useGetSavedByPostIdQuery: jest.fn(),
  useCreateCommentMutation: jest.fn().mockReturnValue([jest.fn()]),
  useCreateLikeMutation: jest.fn().mockReturnValue([jest.fn()]),
  useCreateSaveMutation: jest.fn().mockReturnValue([jest.fn()]),
}));

describe('ProfilePostsSection', () => {
  let mockUserPosts: any;
  let mockProfileUser: any;
  let mockUser: any;

  beforeEach(() => {
    mockUserPosts = [
      {
        images: ['image1.jpg'],
        userId: {
          profilePicture: 'zurag',
        },
        _id: '3',
      },
      {
        images: ['image2.jpg'],
        userId: {
          profilePicture: 'zurag',
        },
        _id: '4',
      },
    ];
    mockProfileUser = { isPrivate: false };
    mockUser = { username: 'john_doe' };

    useGetAllSavedPostsQuery.mockReturnValue({
      data: {
        getAllSavedPosts: [{ postId: { images: ['saved_image1.jpg'] } }],
      },
      loading: false,
    });
    useGetSavedByPostIdQuery.mockReturnValue({
      data: {
        getSavedByPostId: [{ postId: '3', userId: '11' }],
      },
    });
    useGetCommentsByPostIdQuery.mockReturnValue({
      data: {
        getCommentsByPostId: [{ id: '1', postId: '2' }, { id: '2' }, { id: '3' }],
        loading: false,
      },
    });
    useGetLikesByPostIdQuery.mockReturnValue({
      data: {
        getLikesByPostId: [{ id: '1' }, { id: '2' }],
        loading: false,
      },
    });
    useSearchParams.mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === 'type') return 'posts';
        if (key === 'username') return 'john_doe';
        return null;
      }),
    });
  });

  test('renders posts when there are posts and type is "posts"', () => {
    render(<ProfilePostsSection userPosts={mockUserPosts} profileUser={mockProfileUser} isFollow={false} user={mockUser} />);
    expect(screen.getAllByAltText('post')).toHaveLength(2);
  });

  test('renders ProfilePageNoPostYet when no posts are available and type is "posts"', () => {
    render(<ProfilePostsSection userPosts={[]} profileUser={mockProfileUser} isFollow={false} user={mockUser} />);
    expect(screen.getByText('Share your first photo'));
  });

  test('renders ProfilePagePrivate when the profile is private and user follows', () => {
    mockProfileUser.isPrivate = true;
    render(<ProfilePostsSection userPosts={[]} profileUser={mockProfileUser} isFollow={true} user={mockUser} />);
    expect(screen.getByText('This account is private'));
  });

  test('renders ProfilePageNoPostYet when the profile is not private and no posts exist', () => {
    mockProfileUser.isPrivate = false;
    mockUser.username = 'kk';

    render(<ProfilePostsSection userPosts={[]} profileUser={mockProfileUser} isFollow={true} user={mockUser} />);
    expect(screen.getByText('No Post Yet'));
  });

  test('renders ProfilePageFirstPost when user is viewing their own profile and has no posts', () => {
    mockUser.username = 'john_doe';
    render(<ProfilePostsSection userPosts={[]} profileUser={mockProfileUser} isFollow={false} user={mockUser} />);
    expect(screen.getByText('Share your first photo'));
  });

  test("renders ProfilePageNoPostYet when user is viewing another user's profile and they have no posts", () => {
    mockUser.username = 'kk';
    render(<ProfilePostsSection userPosts={[]} profileUser={mockProfileUser} isFollow={false} user={mockUser} />);
    expect(screen.getByText('No Post Yet'));
  });

  test('renders saved posts when saved posts exist and type is "saved"', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === 'type') return 'saved';
        if (key === 'username') return 'john_doe';
        return null;
      }),
    });

    render(<ProfilePostsSection userPosts={[]} profileUser={mockProfileUser} isFollow={false} user={mockUser} />);
    expect(screen.getAllByAltText('post')).toHaveLength(1);
  });

  test('renders the correct number of likes and comments', () => {
    render(<ReactionContainer postId="123" />);

    expect(screen.getByText('2'));

    expect(screen.getByText('3'));
  });
});
