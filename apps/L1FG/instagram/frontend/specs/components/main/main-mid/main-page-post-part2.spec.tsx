/*eslint-disable max-lines*/
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPagePost from '@/components/home/main/MainPagePost';
import { useGetSmallPostsQuery } from '@/generated';
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));
jest.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: { children: React.ReactElement }) => (
    <div data-testid="swiperId" {...props}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => <div data-testid="swiper-slide">{children}</div>,
}));
jest.mock('@/generated', () => ({
  useGetSmallPostsQuery: jest.fn(),
}));
jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

// Mock Swiper CSS
/*eslint-disable*/
jest.mock('swiper/css', () => {});
/*eslint-disable*/
jest.mock('swiper/css/navigation', () => {});
/*eslint-disable*/
jest.mock('swiper/css/pagination', () => {});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Bookmark: () => <div data-testid="bookmark-icon">Bookmark</div>,
  HeartIcon: () => <div data-testid="like-icon">Like</div>,
  MessageCircle: () => <div data-testid="comment-icon">Comments</div>,
  Ellipsis: () => <div data-testid="ellipsis-icon">Ellipsis</div>,
}));

const mockDataHasNextPageTrue = {
  getSmallPosts: {
    edges: [
      {
        cursor: 'asdf',
        node: {
          _id: 'post1',
          postImage: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          carouselMediaCount: 2,
          likeCount: 10,
          commentCount: 5,
          createdAt: '2025-01-23T12:00:00.000Z',
          caption: 'This is a test post',
          user: {
            _id: 'user1',
            profileImage: 'https://example.com/profile.jpg',
            userName: 'testuser',
            fullName: 'Test User',
            bio: 'This is a test bio',
          },
        },
      },
      {
        cursor: 'ghkl',
        node: {
          _id: 'post2',
          postImage: ['https://example.com/image3.jpg'],
          carouselMediaCount: 0,
          likeCount: 0,
          commentCount: 0,
          createdAt: '2025-01-22T12:00:00.000Z',
          caption: 'This post has no image',
          user: {
            _id: 'user2',
            profileImage: 'https://example.com/profile2.jpg',
            userName: 'user2',
            fullName: 'User Two',
            bio: 'Another test bio',
          },
        },
      },
    ],
    pageInfo: {
      endCursor: 'ghkl',
      startCursor: 'asdf',
      hasNextPage: true,
    },
  },
};
const mockDataHasNextPageFalse = {
  getSmallPosts: {
    edges: [
      {
        cursor: 'asdf',
        node: {
          _id: 'post1',
          postImage: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          carouselMediaCount: 2,
          likeCount: 10,
          commentCount: 5,
          createdAt: '2025-01-23T12:00:00.000Z',
          caption: 'This is a test post',
          user: {
            _id: 'user1',
            profileImage: 'https://example.com/profile.jpg',
            userName: 'testuser',
            fullName: 'Test User',
            bio: 'This is a test bio',
          },
        },
      },
      {
        cursor: 'ghkl',
        node: {
          _id: 'post2',
          postImage: ['https://example.com/image3.jpg'],
          carouselMediaCount: 0,
          likeCount: 0,
          commentCount: 0,
          createdAt: '2025-01-22T12:00:00.000Z',
          caption: 'This post has no image',
          user: {
            _id: 'user2',
            profileImage: 'https://example.com/profile2.jpg',
            userName: 'user2',
            fullName: 'User Two',
            bio: 'Another test bio',
          },
        },
      },
    ],
    pageInfo: {
      endCursor: '1234',
      startCursor: '1234',
      hasNextPage: false,
    },
  },
};

const mockDataNodesEmpty = {
  getSmallPosts: {
    edges: [],
    pageInfo: {
      endCursor: 'ghkl',
      startCursor: 'asdf',
      hasNextPage: true,
    },
  },
};
describe('Home main part 1', () => {
  it('Should handleScroll work when nextPage is true and scrolling', async () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataHasNextPageTrue,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    expect(fetchMore).toHaveBeenCalled();
  });
  it('Sould not call handleScroll when nextpage is false and scrolling', () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataHasNextPageFalse,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    expect(fetchMore).not.toHaveBeenCalledWith({
      variables: {
        input: {
          after: 'cursor1',
          first: 6,
        },
      },
      updateQuery: expect.any(Function),
    });
  });
  it('Should correctly updates when fetchMoreResult is falsy', () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataHasNextPageTrue,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    const updateQueryFn = fetchMore.mock.calls[0]?.[0]?.updateQuery;
    const prevResult = mockDataHasNextPageTrue;
    const fetchMoreResult = null;
    const result = updateQueryFn(prevResult, { fetchMoreResult });
    expect(result.getSmallPosts.edges).toHaveLength(2);
    expect(result.getSmallPosts.pageInfo).toEqual({
      endCursor: 'ghkl',
      startCursor: 'asdf',
      hasNextPage: true,
    });
  });
  it('SHould correctly updates when endCursors are same', async () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataHasNextPageTrue,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    const updateQueryFn = fetchMore.mock.calls[0]?.[0]?.updateQuery;
    const prevResult = mockDataHasNextPageTrue;
    const fetchMoreResult = mockDataHasNextPageTrue;
    const result = updateQueryFn(prevResult, { fetchMoreResult });
    expect(result.getSmallPosts.edges).toHaveLength(2);
    expect(result.getSmallPosts.pageInfo).toEqual({
      endCursor: 'ghkl',
      startCursor: 'asdf',
      hasNextPage: true,
    });
  });
  it('Should correctly updates ', async () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataHasNextPageTrue,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    const updateQueryFn = fetchMore.mock.calls[0]?.[0]?.updateQuery;
    const prevResult = mockDataHasNextPageTrue;
    const fetchMoreResult = mockDataHasNextPageFalse;
    const result = updateQueryFn(prevResult, { fetchMoreResult });
    expect(result.getSmallPosts.edges).toHaveLength(4);
    expect(result.getSmallPosts.pageInfo).toEqual({
      endCursor: '1234',
      startCursor: '1234',
      hasNextPage: false,
    });
  });
  it('Should correctly updates when both nodes are empty', async () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataNodesEmpty,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    const updateQueryFn = fetchMore.mock.calls[0]?.[0]?.updateQuery;
    const prevResult = mockDataNodesEmpty;
    const fetchMoreResult = mockDataNodesEmpty;
    const result = updateQueryFn(prevResult, { fetchMoreResult });
    expect(result.getSmallPosts.edges).toHaveLength(0);
    expect(result.getSmallPosts.pageInfo).toEqual({
      endCursor: 'ghkl',
      startCursor: 'asdf',
      hasNextPage: true,
    });
  });
  it('Should not fetch more data', async () => {
    const fetchMore = jest.fn();
    (useGetSmallPostsQuery as jest.Mock).mockReturnValue({
      data: mockDataNodesEmpty,
      fetchMore,
    });
    Object.defineProperty(window, 'innerHeight', { value: 500, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'scrollTop,', {
      get: () => 500,
      set: () => {},
      configurable: true,
    });
    render(<MainPagePost />);
    fireEvent.scroll(window);
    expect(fetchMore).not.toHaveBeenCalled();
  });
});
