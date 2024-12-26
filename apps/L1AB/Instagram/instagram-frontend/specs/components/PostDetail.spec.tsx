/* eslint-disable max-lines */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostDetail from '@/components/PostDetail';
import { MockedProvider } from '@apollo/client/testing';
import { CreateCommentDocument, CreateLikeDocument, CreateSaveDocument, GetCommentsByPostIdDocument, GetLikesByPostIdDocument } from '@/generated';
import { InMemoryCache } from '@apollo/client';
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));

const mockPostData = {
  postimages: ['/image1.jpg', '/image2.jpg'],
  postcaption: 'Test Caption',
  userName: 'testuser',
  userProfile: '/profile.jpg',
  postId: '2',
  userId: '11',
  createdAt: '2024-11-19T08:18:14.047+00:00',
};

export const createCommentMock = {
  request: { query: CreateCommentDocument, variables: { input: { comment: 'comment', postId: '2', userId: '11' } } },
  result: { data: { createComment: { _id: '1', comment: 'Great post!', updatedAt: 'user123', createdAt: '2023-10-01' } } },
};
export const getCommentsMock = {
  request: { query: GetCommentsByPostIdDocument, variables: { postId: '2' } },
  result: {
    data: {
      getCommentsByPostId: [
        { _id: '1', userId: { username: 'name', _id: '2' }, postId: { _id: '2' }, comment: 'testComment' },
        { _id: '2', userId: { username: 'name', _id: '2' }, postId: { _id: '2' }, comment: 'testComment' },
      ],
    },
  },
  newData: () => {
    return {
      data: {
        getCommentsByPostId: [
          { _id: '1', userId: { username: 'name', _id: '2' }, postId: { _id: '2' }, comment: 'testComment' },
          { _id: '2', userId: { username: 'name', _id: '2' }, postId: { _id: '2' }, comment: 'testComment' },
        ],
      },
    };
  },
};
const createLikeMock = {
  request: {
    query: CreateLikeDocument,
    variables: { postId: '2', userId: '11' },
  },
  result: {
    data: {
      createLike: { _id: '1', postId: '2', userId: '11' },
    },
  },
};
const createSaveMock = {
  request: {
    query: CreateSaveDocument,
    variables: { postId: '2', userId: '11' },
  },
  result: {
    data: {
      createSave: { _id: '1', postId: '2', userId: '11' },
    },
  },
};
const getLikesByPostIdMock = {
  request: {
    query: GetLikesByPostIdDocument,
    variables: { postId: '2' },
  },
  result: {
    data: {
      getLikesByPostId: [{ _id: '1', userId: '11', postId: '2' }],
    },
  },
  newData: () => {
    return {
      data: {
        getLikesByPostId: [
          { _id: '1', userId: '11', postId: '2' },
          { _id: '2', userId: '12', postId: '2' },
        ],
      },
    };
  },
};

describe('PostDetail Component', () => {
  beforeEach(() => {
    const cache = new InMemoryCache();
    cache.reset();
  });

  it('should navigate to the next image correctly', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
    const messageCircleIcon = getByTestId('MessageCircleIcon');
    fireEvent.click(messageCircleIcon);

    const NextButton = getByTestId('NextButton');

    fireEvent.click(NextButton);
  });
  it('should handle multiple next and prev navigations', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
    const message = getByTestId('MessageCircleIcon');
    fireEvent.click(message);

    const NextButton = getByTestId('NextButton');
    fireEvent.click(NextButton);
    const PrevButton = getByTestId('PrevButton');

    fireEvent.click(PrevButton);
  });
  it('should create new comment', async () => {
    render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock, createLikeMock, createSaveMock]} addTypename={false}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const message = screen.getByTestId('MessageCircleIcon');
    fireEvent.click(message);

    const commentInput = screen.getByTestId('commentInput') as HTMLInputElement;
    const postButton = screen.getByTestId('handleComment');

    fireEvent.change(commentInput, { target: { value: 'comment' } });
    fireEvent.click(postButton);
  });

  it('should like and save', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock, createSaveMock, createLikeMock, getLikesByPostIdMock]} addTypename={false}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    const message = screen.getByTestId('MessageCircleIcon');
    fireEvent.click(message);

    const handlelike = getByTestId('likeButton');
    fireEvent.click(handlelike);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const handlesave = getByTestId('saveButton');
    fireEvent.click(handlesave);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
