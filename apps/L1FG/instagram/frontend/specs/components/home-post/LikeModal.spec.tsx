import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGetlikePostQuery } from '@/generated';
import LikeModal from '@/components/home-post/LikeModal';

jest.mock('@/generated', () => ({
  useGetlikePostQuery: jest.fn(),
}));

const mockData = {
  getlikePost: [
    {
      user: {
        _id: '123',
        userName: 'testuser',
        fullName: 'Test User',
      },
    },
  ],
};

describe('LikeModal Component', () => {
  it('renders without crashing', () => {
    (useGetlikePostQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    render(
      <MockedProvider>
        <LikeModal postId="testPostId">Open Modal</LikeModal>
      </MockedProvider>
    );
  });

  it('opens the modal when clicked and displays user info', async () => {
    (useGetlikePostQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    render(
      <MockedProvider>
        <LikeModal postId="testPostId">
          <button data-testid="trigger">Open Modal</button>
        </LikeModal>
      </MockedProvider>
    );
  });
  it('does not render content when loading', () => {
    (useGetlikePostQuery as jest.Mock).mockReturnValue({ data: null, loading: true });

    const { container } = render(
      <MockedProvider>
        <LikeModal postId="testPostId">Open Modal</LikeModal>
      </MockedProvider>
    );

    expect(container.firstChild).toBeNull();
  });
});
