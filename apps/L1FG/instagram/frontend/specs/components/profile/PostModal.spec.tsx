import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { GetCommentsDocument } from '@/generated';
import PostModal from '@/components/profile/profilePost/PostModal';

const postMock = {
  _id: '123',
  user: { fullName: 'Test User' },
  commentCount: 5,
  postImage: ['/images/sample1.jpg', '/images/sample2.jpg'],
};

const mocks = [
  {
    request: {
      query: GetCommentsDocument,
      variables: { input: { postId: '123' } },
    },
    result: {
      data: {
        getComments: [{ id: '1', comment: 'Great post!', user: { userName: 'Alice', profileImage: '/images/alice.png' } }],
      },
    },
  },
];

describe('PostModal Component', () => {
  test('renders PostModal with children', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostModal post={postMock}>
          <button data-testid="open-modal">Open</button>
        </PostModal>
      </MockedProvider>
    );

    expect(screen.getByTestId('open-modal')).toBeInTheDocument();
  });

  test('renders GetComments when commentCount is truthy', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostModal post={postMock} />
      </MockedProvider>
    );
  });

  test("renders 'No comments yet.' when commentCount is falsy", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostModal post={{ ...postMock, commentCount: 0 }} />
      </MockedProvider>
    );
  });

  test('modal opens when clicked', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostModal post={postMock}>
          <button data-testid="open-modal">Open</button>
        </PostModal>
      </MockedProvider>
    );
  });
});
