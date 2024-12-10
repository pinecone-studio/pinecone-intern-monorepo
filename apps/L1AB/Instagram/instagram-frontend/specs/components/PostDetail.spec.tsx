import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '@/components/PostDetail';
import { MockedProvider } from '@apollo/client/testing';
import { CreateCommentDocument, GetCommentsByPostIdDocument } from '@/generated';
import { InMemoryCache } from '@apollo/client';

const mockPostData = {
  postimages: ['/image1.jpg', '/image2.jpg'],
  postcaption: 'Test Caption',
  userName: 'testuser',
  userProfile: '/profile.jpg',
  postId: '2',
  userId: '11',
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
          { _id: '2', userId: { username: 'name', _id: '2' }, postId: { _id: '2' }, comment: 'testComment' }]}};
  },
};
describe('PostDetail Component', () => {
  beforeEach(() => {
    const cache = new InMemoryCache();
    cache.reset();
  });
  it('should navigate to the previous image correctly', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
    const messageCircleIcon = getByTestId('MessageCircleIcon');
    fireEvent.click(messageCircleIcon);

    const PrevButton = getByTestId('PrevButton');

    expect(PrevButton).toBeTruthy();

    fireEvent.click(PrevButton);
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

    expect(NextButton).toBeTruthy();

    fireEvent.click(NextButton);
  });
  it('should handle multiple next and prev navigations', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
    const message = getByTestId('MessageCircleIcon');
    fireEvent.click(message);

    const NextButton = getByTestId('NextButton');
    const PrevButton = getByTestId('PrevButton');
    
    fireEvent.click(NextButton);
    fireEvent.click(PrevButton);
    fireEvent.click(PrevButton);
    fireEvent.click(NextButton);
    fireEvent.click(NextButton);
    fireEvent.click(NextButton);
  });
  it('displays post details correctly', async () => {
    const { debug } =render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    const messageIcon = screen.getByTestId('MessageCircleIcon');
    fireEvent.click(messageIcon);

    debug();

    const usernameElements = screen.getAllByText(mockPostData.userName);
    expect(usernameElements.length).toBeGreaterThan(0);

    const captionElements = screen.getAllByText(mockPostData.postcaption);
    expect(captionElements.length).toBeGreaterThan(0);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(mockPostData.postimages.length);
  });

  it('should create new comment', async () => {
    render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]} addTypename={false}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const message = screen.getByTestId('MessageCircleIcon');
    fireEvent.click(message);

    const commentInput = screen.getByTestId('commentInput') as HTMLInputElement;
    const postButton = screen.getByTestId('handleComment');

    fireEvent.change(commentInput, { target: { value: 'comment' } });
    fireEvent.click(postButton);

    await waitFor(() => expect(commentInput.value).toEqual(''));
  });

  it('handles comment creation with no user ID gracefully', async () => {
    const postDataNoUser = { ...mockPostData, userId: '' };

    render(
      <MockedProvider>
        <PostDetail {...postDataNoUser} />
      </MockedProvider>
    );

    const messageIcon = screen.getByTestId('MessageCircleIcon');
    fireEvent.click(messageIcon);

    const commentInput = screen.getByTestId('commentInput');
    const postButton = screen.getByTestId('handleComment');

    fireEvent.change(commentInput, { target: { value: 'comment' } });
    fireEvent.click(postButton);
  });
})