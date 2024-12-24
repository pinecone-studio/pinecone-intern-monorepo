import PostCard from '@/components/PostCard';
import { useUser } from '@/components/providers';

import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react';

export type PropsType = {
  src: string;
  alt: string;
};

jest.mock('@/components/providers', () => {
  const actual = jest.requireActual('@/components/providers');
  return {
    ...actual,
    useStory: jest.fn(() => ({
      groupedStories: {
        '123': {
          userId: {
            _id: '123',
            username: 'gerle',
            profilePicture: 'http://image',
          },
          stories: [
            {
              _id: '675168f668ea2b7a405f57a7',
              userId: { _id: '123', username: 'gerle', profilePicture: 'http://image' },
              image: 'http://image',
              createdAt: '2024-12-05T08:48:54.229Z',
            },
            {
              _id: '675168f668ea2b7a405f57a7aa',
              createdAt: '2024-12-05T08:48:54.229Z',
              image: 'http://image',
              userId: { _id: '123', username: 'gerle', profilePicture: 'http://image' },
            },
          ],
        },
      },
    })),
    useUser: jest.fn(() => ({
      user: {
        _id: '123',
      },
    })),
  };
});

jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: PropsType) => <img src={src} alt={alt} />,
}));

describe('PostCard Component - prev/next functionality', () => {
  const sampleProps = {
    userName: 'John Doe',
    likeCount: 123,
    images: ['/image1.jpg', '/image2.jpg'],
    profilePicture: 'profile.jpg',
    caption: 'This is a sample caption',
    postId: '2',
    postOwnerId: '123',
    deletePost: jest.fn(),
  };
  it('image slider', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
    const NextButton = getByTestId('NextButton');

    fireEvent.click(NextButton);

    const PrevButton = getByTestId('PrevButton');

    fireEvent.click(PrevButton);

    const DeleteButton = getByTestId('deleteButton-2');
    fireEvent.click(DeleteButton);

    const Delete = getByTestId('delete-2');
    fireEvent.click(Delete);

    const DeletePost = getByTestId('deletePost-2');
    fireEvent.click(DeletePost);
  });

  it('image slider', async () => {
    render(
      <MockedProvider>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
  });

  it('user null', async () => {
    (useUser as jest.Mock).mockReturnValue({ user: undefined });
    render(
      <MockedProvider>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
  });
});
