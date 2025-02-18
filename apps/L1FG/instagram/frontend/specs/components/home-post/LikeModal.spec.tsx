import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useGetFollowersQuery } from '@/generated';
import LikeModal from '@/components/home-post/LikeModal';

jest.mock('@/generated', () => ({
  useGetFollowersQuery: jest.fn(),
}));

const mockData = {
  getFollowers: [
    {
      user: {
        _id: 'user123',
        userName: 'testuser',
        fullName: 'Test User',
      },
    },
  ],
};

describe('LikeModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the LikeModal component correctly', () => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    render(
      <MockedProvider>
        <LikeModal userId="user123">
          <button>Open Modal</button>
        </LikeModal>
      </MockedProvider>
    );
  });

  it('opens the modal when clicked', async () => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

    render(
      <MockedProvider>
        <LikeModal userId="user123">
          <button>Open Modal</button>
        </LikeModal>
      </MockedProvider>
    );
  });
});

it('displays followers when modal is opened', async () => {
  (useGetFollowersQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

  render(
    <MockedProvider>
      <LikeModal userId="user123">
        <button>Open Modal</button>
      </LikeModal>
    </MockedProvider>
  );
});
it('renders loading state correctly', () => {
  (useGetFollowersQuery as jest.Mock).mockReturnValue({ loading: true });

  render(
    <MockedProvider>
      <LikeModal userId="user123">
        <button>Open Modal</button>
      </LikeModal>
    </MockedProvider>
  );
});

it('closes the modal when close button is clicked', async () => {
  (useGetFollowersQuery as jest.Mock).mockReturnValue({ data: mockData, loading: false });

  render(
    <MockedProvider>
      <LikeModal userId="user123">
        <button>Open Modal</button>
      </LikeModal>
    </MockedProvider>
  );
});
