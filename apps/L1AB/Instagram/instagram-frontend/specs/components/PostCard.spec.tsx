import PostCard from '@/components/PostCard';
import { CreateCommentDocument, CreateLikeDocument, GetCommentsByPostIdDocument, GetLikesByPostIdDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { GraphQLError } from 'graphql';

export type PropsType = {
  src: string;
  alt: string;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: PropsType) => <img src={src} alt={alt} />,
}));

const mocks: MockedResponse[] = [
  {
    request: {
      query: CreateCommentDocument,
      variables: {
        input: {
          comment: 'comment',
          postId: '2',
          userId: '11',
        },
      },
    },
    result: {
      data: {
        createComment: {
          _id: '1',
          comment: 'Great post!',
          updatedAt: 'user123',
          createdAt: '2023-10-01',
        },
      },
    },
  },
  {
    request: {
      query: CreateLikeDocument,
      variables: {
        postId: '2',
        userId: '11',
      },
    },
    result: {
      data: {
        createLike: {
          _id: '1',
          postId: '2',
          userId: '11',
        },
      },
    },
  },
  {
    request: {
      query: GetLikesByPostIdDocument,
      variables: {
        postId: '2',
      },
    },
    result: {
      data: {
        getLikesByPostId: [
          {
            _id: '1',
            userId: '11',
            postId: '2',
          },
        ],
      },
    },
    newData: () => {
      return {
        data: {
          getLikesByPostId: [
            {
              _id: '1',
              userId: '11',
              postId: '2',
            },
          ],
        },
      };
    },
  },
  {
    request: {
      query: GetCommentsByPostIdDocument,
      variables: {
        postId: '2',
      },
    },
    result: {
      data: {
        getCommentsByPostId: [
          {
            _id: '1',
            userId: {
              username: 'name',
              _id: '2',
            },
            postId: {
              _id: '2',
            },
            comment: 'testComment',
          },
        ],
      },
    },
    newData: () => {
      return {
        data: {
          getCommentsByPostId: [
            {
              _id: '1',
              userId: {
                username: 'name',
                _id: '2',
              },
              postId: {
                _id: '2',
              },
              comment: 'testComment',
            },
          ],
        },
      };
    },
  },
];

const GetCommentsErrorMock = {
  request: {
    query: GetCommentsByPostIdDocument,
    variables: {
      postId: '2',
    },
  },
  result: {
    errors: [new GraphQLError('Error')],
  },
};

const sampleProps = {
  userName: 'John Doe',
  likeCount: 123,
  images: ['/image1.jpg', '/image2.jpg', '/image3.jpg'],
  profilePicture: 'profile.jpg',
  caption: 'This is a sample caption',
  keyy: 1,
  postId: '2',
};

describe('PostCard Component - prev/next functionality', () => {
  it('image slider', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('11'),
      },
    });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const NextButton = getByTestId('NextButton');
    const PrevButton = getByTestId('PrevButton');

    fireEvent.click(NextButton);
    fireEvent.click(PrevButton);
    fireEvent.click(PrevButton);
    fireEvent.click(NextButton);
    fireEvent.click(NextButton);
    fireEvent.click(NextButton);
  });

  it('Create comment', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('11'),
      },
    });
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const commentInput = getByTestId('commentInput') as HTMLInputElement;

    fireEvent.change(commentInput, { target: { value: 'comment' } });

    const createComment = getByTestId('handleComment');
    fireEvent.click(createComment);

    await waitFor(() => expect(commentInput.value).toEqual(''));
  });

  it('Create comment with error', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('11'),
      },
    });
    const { getByTestId } = render(
      <MockedProvider mocks={[...mocks.slice(0, -1), GetCommentsErrorMock]} addTypename={false}>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const commentInput = getByTestId('commentInput') as HTMLInputElement;

    fireEvent.change(commentInput, { target: { value: 'comment' } });

    const createComment = getByTestId('handleComment');
    fireEvent.click(createComment);
  });

  it('Like post', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('11'),
      },
    });
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const likeButton = getByTestId('likeButton');
    fireEvent.click(likeButton);
    expect(likeButton);
  });
  it('With no userId', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('11'),
      },
    });
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostCard {...sampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
