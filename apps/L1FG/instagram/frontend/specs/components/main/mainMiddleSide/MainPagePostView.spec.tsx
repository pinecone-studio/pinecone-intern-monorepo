/*eslint-disable*/
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import React, { PropsWithChildren } from 'react';
import { GetAllPostsDocument } from '@/generated';
import MainPagePost from '@/components/Home/mainBar/MainPagePost';

jest.mock('swiper/css', () => '');
jest.mock('swiper/css/pagination', () => '');
jest.mock('swiper/css/navigation', () => '');
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: PropsWithChildren) => <div>{children}</div>,
  SwiperSlide: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

interface MockRequest {
  request: {
    query: typeof GetAllPostsDocument;
  };
  error?: Error;
  result?: {
    data: {
      getAllPosts: Post[];
    };
  };
}

interface Post {
  _id: string;
  user: {
    userName: string;
  };
  caption: string;
  likeCount: number;
  commentCount: number;
  postImage: string[];
  carouselMediaCount: number;
}

const mockLoading: MockRequest[] = [];

const mockError = [
  {
    request: {
      query: GetAllPostsDocument,
    },
    error: new Error('Failed to fetch'),
  },
];

const mockNoPosts = [
  {
    request: {
      query: GetAllPostsDocument,
    },
    result: {
      data: {
        getAllPosts: [],
      },
    },
  },
];

const mockPosts = [
  {
    request: {
      query: GetAllPostsDocument,
    },
    result: {
      data: {
        getAllPosts: [
          {
            _id: '1',
            user: {
              userName: 'john_doe',
            },
            caption: 'Hello world!',
            likeCount: 10,
            commentCount: 5,
            postImage: ['/images/post1.jpg'],
            carouselMediaCount: 1,
          },
        ],
      },
    },
  },
];

const mockPostsNoImages = [
  {
    request: {
      query: GetAllPostsDocument,
    },
    result: {
      data: {
        getAllPosts: [
          {
            _id: '2',
            user: {
              userName: 'no_image_user',
            },
            caption: 'This post has no image',
            likeCount: 5,
            commentCount: 2,
            postImage: [], // No images, should use default
            carouselMediaCount: 0,
          },
        ],
      },
    },
  },
];

describe('MainPagePost Component', () => {
  it('renders loading message while fetching posts', () => {
    render(
      <MockedProvider mocks={mockLoading} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading-message')).toHaveTextContent('Loading posts...');
  });

  it('renders error message if fetching fails', async () => {
    render(
      <MockedProvider mocks={mockError} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Error loading posts: Failed to fetch');
    });
  });

  it('renders "No posts available" if there are no posts', async () => {
    render(
      <MockedProvider mocks={mockNoPosts} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('no-posts-message')).toHaveTextContent('No posts available.');
    });
  });

  it('renders posts with images correctly', async () => {
    render(
      <MockedProvider mocks={mockPosts} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('post-item')).toBeInTheDocument();
      expect(screen.getByTestId('post-username')).toHaveTextContent('john_doe');
      expect(screen.getByTestId('post-description')).toHaveTextContent('Hello world!');
    });

    // Check if the post image exists
    const postImage = screen.getByTestId('post-image');
    expect(postImage).toHaveAttribute('src', expect.stringMatching(/\/_next\/image\?url=%2Fimages%2Fpost1\.jpg&w=\d+&q=\d+/));
  });
  it('renders default image when post has no images', async () => {
    render(
      <MockedProvider mocks={mockPostsNoImages} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('post-item')).toBeInTheDocument();
      expect(screen.getByTestId('post-username')).toHaveTextContent('no_image_user');
      expect(screen.getByTestId('post-description')).toHaveTextContent('This post has no image');
    });

    // Check if the default image is used
    const defaultImage = screen.getByTestId('post-image');
    expect(defaultImage).toHaveAttribute('src', expect.stringContaining('%2Fimages%2FprofilePic.png'));
  });
  it('renders like count and comment count', async () => {
    render(
      <MockedProvider mocks={mockPosts} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('like-count')).toHaveTextContent('10 likes');
      expect(screen.getByTestId('view-comments')).toHaveTextContent('View 5 comments');
    });
  });

  it('renders interactive icons (like, comment, bookmark)', async () => {
    render(
      <MockedProvider mocks={mockPosts} addTypename={false}>
        <MainPagePost />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('like-icon')).toBeInTheDocument();
      expect(screen.getByTestId('comment-icon')).toBeInTheDocument();
      expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
    });
  });
});

it('does not render anything if post is null', async () => {
  const mockPostsWithNull: MockRequest[] = [
    {
      request: {
        query: GetAllPostsDocument,
      },
      result: {
        data: {
          getAllPosts: [null], // Simulate a null post
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mockPostsWithNull} addTypename={false}>
      <MainPagePost />
    </MockedProvider>
  );

  await waitFor(() => {
    // Ensure the post container exists
    expect(screen.getByTestId('posts-container')).toBeInTheDocument();
    // Check that no post items are rendered
    expect(screen.queryByTestId('post-item')).not.toBeInTheDocument();
  });
});

it('renders no comments message when there are no comments', async () => {
  const mockPostWithNoComments: MockRequest[] = [
    {
      request: {
        query: GetAllPostsDocument,
      },
      result: {
        data: {
          getAllPosts: [
            {
              _id: '3',
              user: {
                userName: 'user_no_comments',
              },
              caption: 'This post has no comments',
              likeCount: 2,
              commentCount: 0, // No comments
              postImage: ['/images/post2.jpg'],
              carouselMediaCount: 1,
            },
          ],
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mockPostWithNoComments} addTypename={false}>
      <MainPagePost />
    </MockedProvider>
  );

  await waitFor(() => {
    // Ensure the post is rendered
    expect(screen.getByTestId('post-item')).toBeInTheDocument();
    // Ensure the "no comments" message is rendered
    expect(screen.getByTestId('no-comments')).toBeInTheDocument();
  });
});
