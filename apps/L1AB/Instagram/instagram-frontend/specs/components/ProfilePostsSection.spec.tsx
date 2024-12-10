import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import ProfilePostsSection from '@/components/ProfilePostsSection';

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }) => <img src={src} alt={alt} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

import { useGetAllSavedPostsQuery } from '@/generated';
import { useSearchParams } from 'next/navigation';
jest.mock('@/generated', () => ({
  useGetAllSavedPostsQuery: jest.fn(),
}));

describe('ProfilePostsSection', () => {
  let mockUserPosts: any;
  let mockProfileUser: any;
  let mockUser: any;

  beforeEach(() => {
    mockUserPosts = [{ images: ['image1.jpg'] }, { images: ['image2.jpg'] }];
    mockProfileUser = { isPrivate: false };
    mockUser = { username: 'john_doe' };

    useGetAllSavedPostsQuery.mockReturnValue({
      data: {
        getAllSavedPosts: [{ postId: { images: ['saved_image1.jpg'] } }],
      },
      loading: false,
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
});
