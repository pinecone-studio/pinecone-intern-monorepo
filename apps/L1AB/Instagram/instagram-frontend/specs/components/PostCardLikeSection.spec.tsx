/* eslint-disable max-lines */
import PostCardLikeSection from '@/components/PostCardLikeSection';
import { CreateLikeDocument, CreateSaveDocument, GetLikesByPostIdDocument, GetSavedByPostIdDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render } from '@testing-library/react';

export const PostCardSampleProps = {
  postId: '2',
  userId: '11',
  images: ['/image1.jpg', '/image2.jpg'],
  caption: 'Test Caption',
  userName: 'testuser',
  profilePicture: '/profile.jpg',
};

const PostCardSamplePropsWithoutUserId = {
  postId: '2',
  userId: '',
  images: [],
  caption: '',
  userName: '',
  profilePicture: '',
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

export const createSaveMock = {
  request: {
    query: CreateSaveDocument,
    variables: {
      postId: '2',
      userId: '11',
    },
  },
  result: {
    data: {
      createSave: {
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

export const getSavedByPostIdMock = {
  request: {
    query: GetSavedByPostIdDocument,
    variables: {
      postId: '2',
    },
  },
  result: {
    data: {
      getSavedByPostId: {
        postId: {
          _id: '2',
        },
        userId: {
          _id: '11',
        },
      },
    },
  },
  newData: () => {
    return {
      data: {
        getSavedByPostId: {
          postId: {
            _id: '2',
          },
          userId: {
            _id: '11',
          },
        },
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

  it('save post', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createSaveMock, getSavedByPostIdMock]} addTypename={false}>
        <PostCardLikeSection {...PostCardSampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const saveButton = getByTestId('saveButton');
    fireEvent.click(saveButton);
  });
  it('save post', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createSaveMock, getSavedByPostIdMock]} addTypename={false}>
        <PostCardLikeSection {...PostCardSamplePropsWithoutUserId} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const saveButton = getByTestId('saveButton');
    fireEvent.click(saveButton);
  });

  it('saved post', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createSaveMock, getSavedByPostIdMock]} addTypename={false}>
        <PostCardLikeSection {...PostCardSampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const saveButton = getByTestId('saveButton');
    fireEvent.click(saveButton);
  });
});
