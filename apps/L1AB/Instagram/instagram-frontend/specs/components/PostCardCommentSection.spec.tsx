import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { PostCardSampleProps } from './PostCardLikeSection.spec';
import PostCardCommentSection from '@/components/PostCardCommentSection';
import { CreateCommentDocument, GetCommentsByPostIdDocument } from '@/generated';

const PostCardSamplePropsWithoutUserId = {
  postId: '2',
  userId: '',
};

export const createCommentMock = {
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
};
export const getCommentsMock = {
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
        {
          _id: '2',
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
          {
            _id: '2',
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
};

describe('PostCardCommentSection', () => {
  it('Create comment', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]} addTypename={false}>
        <PostCardCommentSection {...PostCardSampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const commentInput = getByTestId('commentInput') as HTMLInputElement;

    fireEvent.change(commentInput, { target: { value: 'comment' } });

    const createComment = getByTestId('handleComment');
    fireEvent.click(createComment);

    await waitFor(() => expect(commentInput.value).toEqual(''));
  });

  it('Try to Create comment without user', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]} addTypename={false}>
        <PostCardCommentSection {...PostCardSamplePropsWithoutUserId} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const commentInput = getByTestId('commentInput') as HTMLInputElement;

    fireEvent.change(commentInput, { target: { value: 'comment' } });

    const createComment = getByTestId('handleComment');
    fireEvent.click(createComment);
  });
});
