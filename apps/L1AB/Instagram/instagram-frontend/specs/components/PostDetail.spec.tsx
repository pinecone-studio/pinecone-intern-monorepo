import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDetail from '@/components/PostDetail';
import { MockedProvider } from '@apollo/client/testing';
import { CreateCommentDocument, GetCommentsByPostIdDocument, useCreateCommentMutation, useGetCommentsByPostIdQuery } from '@/generated';
import userEvent from '@testing-library/user-event';
import { InMemoryCache } from '@apollo/client';
jest.mock('@/generated', () => ({
  useCreateCommentMutation: jest.fn(),
  useGetCommentsByPostIdQuery: jest.fn(),
}));
const mockPostData = {
  postimages: ['/image1.jpg', '/image2.jpg'],
  postcaption: 'Test Caption',
  userName: 'testuser',
  userProfile: '/profile.jpg',
  postId: 'post123',
  userId: 'user456',
};
const mockCommentsData = {
  getCommentsByPostId: [{ userId: { username: 'commenter1', profilePicture: '/commenter1.jpg' }, comment: 'Great post!' }],
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
describe('PostDetail Component', () => {
  // beforeEach(() => {
  //   const cache = new InMemoryCache();
  //   cache.reset();
  //   (useGetCommentsByPostIdQuery as jest.Mock).mockReturnValue({
  //     data: mockCommentsData,
  //     refetch: jest.fn(),
  //   });
  //   (useCreateCommentMutation as jest.Mock).mockReturnValue([jest.fn()]);
  // });
  it('image slider', async () => {
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
  });
  it('displays post details correctly', () => {
    render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
    expect(screen.getByText(mockPostData.userName)).toBeInTheDocument();
    expect(screen.getByText(mockPostData.postcaption)).toBeInTheDocument();
  });
  it('Create comment', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getCommentsMock, createCommentMock]} addTypename={false}>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    const message = getByTestId('MessageCircleIcon');
    fireEvent.click(message);
    const commentInput = getByTestId('commentInput') as HTMLInputElement;

    fireEvent.change(commentInput, { target: { value: 'comment' } });

    const createComment = getByTestId('handleComment');
    fireEvent.click(createComment);

    await waitFor(() => expect(commentInput.value).toEqual(''));
  });
  it('should handle comment input and submission', async () => {
    const createCommentMock = jest.fn();
    (useCreateCommentMutation as jest.Mock).mockReturnValue([createCommentMock]);
    render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );

    const commentInput = screen.getByTestId('commentInput');
    userEvent.type(commentInput, 'This is a test comment');
    const postButton = screen.getByText(/Post/i);
    userEvent.click(postButton);

    expect(createCommentMock).calledOnceWith({
      variables: {
        input: {
          comment: 'This is a test comment',
          postId: '123',
          userId: '456',
        },
      },
    });

  });

  it('should display the existing comments', () => {
    render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
  });

  it('should open the dialog when the MessageCircle icon is clicked', () => {
    render(
      <MockedProvider>
        <PostDetail {...mockPostData} />
      </MockedProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /message/i }));
  });
});
