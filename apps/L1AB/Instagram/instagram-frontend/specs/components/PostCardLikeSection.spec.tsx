import PostCardLikeSection from '@/components/PostCardLikeSection';
import { CreateLikeDocument, GetLikesByPostIdDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';

export const PostCardSampleProps = {
  postId: '2',
  userId: '11',
};

const PostCardSamplePropsWithoutUserId = {
  postId: '2',
  userId: '',
};

export const createLikeMock = {
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
};

export const getLikesByPostIdMock = {
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
          {
            _id: '2',
            userId: '11',
            postId: '2',
          },
        ],
      },
    };
  },
};
describe('PostCardLikeSection', () => {
  it('Like post', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createLikeMock, getLikesByPostIdMock]} addTypename={false}>
        <PostCardLikeSection {...PostCardSampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const likeButton = getByTestId('likeButton');
    fireEvent.click(likeButton);
  });

  it('With no userId', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createLikeMock, getLikesByPostIdMock]} addTypename={false}>
        <PostCardLikeSection {...PostCardSamplePropsWithoutUserId} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const likeButton = getByTestId('likeButton');
    fireEvent.click(likeButton);
  });
});
