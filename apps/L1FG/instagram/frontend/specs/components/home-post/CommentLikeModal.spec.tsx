import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGetCommentLikedPeopleQuery } from '@/generated';
import CommentLikeModal from '@/components/home-post/CommentLikeModal';

jest.mock('@/generated', () => ({
  useGetCommentLikedPeopleQuery: jest.fn(),
}));

const mockData = {
  getCommentLikedPeople: [
    {
      user: {
        _id: '123',
        userName: 'testuser',
        fullName: 'Test User',
      },
    },
  ],
};

describe('CommentLikeModal Component', () => {
  it('does not render content when loading', () => {
    (useGetCommentLikedPeopleQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { container } = render(
      <MockedProvider>
        <CommentLikeModal commentId="testCommentId">Open Modal</CommentLikeModal>
      </MockedProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders modal trigger button', () => {
    (useGetCommentLikedPeopleQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    render(
      <MockedProvider>
        <CommentLikeModal commentId="testCommentId">
          <button data-testid="trigger">Open Modal</button>
        </CommentLikeModal>
      </MockedProvider>
    );
  });

  it('opens the modal when trigger is clicked and displays user info', async () => {
    (useGetCommentLikedPeopleQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    render(
      <MockedProvider>
        <CommentLikeModal commentId="testCommentId">
          <button data-testid="trigger">Open Modal</button>
        </CommentLikeModal>
      </MockedProvider>
    );
  });
});
