/*eslint-disable max-lines*/
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import MainPagePost from '@/components/Home/mainBar/MainPagePost';

import { GetAllPostsDocument } from '@/generated';
// import Image from 'next/image';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <image {...props} alt={props.alt} />;
  },
}));

// Mock Swiper components
jest.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: { children: React.ReactElement }) => (
    <div data-testid="swiperId" {...props}>
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactElement }) => <div data-testid="swiper-slide">{children}</div>,
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
}));

const mockData = {
  getAllPosts: [
    {
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
    {
      _id: 'post2',
      postImage: null,
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
  ],
};

const mocks = [
  {
    request: {
      query: GetAllPostsDocument,
      variables: {}, // Add any required variables
    },
    result: {
      data: mockData,
    },
  },
];

const errorMock = [
  {
    request: {
      query: GetAllPostsDocument,
      variables: {},
    },
    error: new Error('Failed to fetch posts'),
  },
];

const emptyMock = [
  {
    request: {
      query: GetAllPostsDocument,
      variables: {},
    },
    result: {
      data: { getAllPosts: [] },
    },
  },
];

describe('MainPagePost Component', () => {
  it('renders loading state', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading-message')).toBeInTheDocument();
  });

  it('renders posts with correct details', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      // Check posts container
      const postsContainer = screen.getByTestId('posts-container');
      expect(postsContainer).toBeInTheDocument();

      // Check post items
      const postItems = screen.getAllByTestId('post-item');
      expect(postItems).toHaveLength(2); // Two posts

      // Check first post
      const firstPostImages = screen.getAllByTestId('post-image');
      expect(firstPostImages).toHaveLength(3); // 2 images for post 1 and 1 default image for post 2
      expect(firstPostImages[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
      expect(firstPostImages[1]).toHaveAttribute('src', 'https://example.com/image2.jpg');

      // Check second post
      expect(firstPostImages[2]).toHaveAttribute('src', '/images/profilePic.png');

      // Check like count
      const likeCounts = screen.getAllByTestId('like-count');
      expect(likeCounts).toHaveLength(2);
      expect(likeCounts[0]).toHaveTextContent('10 likes');
      expect(likeCounts[1]).toHaveTextContent('0 likes');

      // Check comments
      const viewComments = screen.queryByTestId('view-comments');
      expect(viewComments).toHaveTextContent('View 5 comment(s)');

      const noComments = screen.getByTestId('no-comments');
      expect(noComments).toHaveTextContent('No comments yet.');
    });
  });

  it('renders error state', async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch posts/i)).toBeInTheDocument();
    });
  });

  it('renders no posts message', async () => {
    render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('no-posts-message')).toBeInTheDocument();
    });
  });

  it('handles null post in map', async () => {
    const mockDataWithNull = {
      getAllPosts: [
        ...mockData.getAllPosts,
        null as any, // Type assertion to bypass TypeScript checks
      ],
    };

    const mocks = [
      {
        request: {
          query: GetAllPostsDocument, // Use the actual query document
        },
        result: {
          data: mockDataWithNull,
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      const postItems = screen.getAllByTestId('post-item');
      expect(postItems).toHaveLength(2); // Original posts, null post skipped
    });
  });

  it('renders default image for posts with no images', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      const defaultImage = screen.getAllByTestId('post-image').find((image) => image.getAttribute('src')?.includes('/images/profilePic.png'));
      expect(defaultImage).toBeInTheDocument();
    });
  });
});
