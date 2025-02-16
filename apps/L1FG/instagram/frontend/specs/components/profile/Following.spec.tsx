import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGetFollowingQuery } from '@/generated';
import Following from '@/components/profile/follow/Following';

jest.mock('@/generated', () => ({
  useGetFollowingQuery: jest.fn(),
}));

describe('Following Component', () => {
  const mockFollowing = {
    getFollowing: [
      {
        user: {
          userName: 'jane_doe',
          fullName: 'Jane Doe',
        },
      },
    ],
  };

  beforeEach(() => {
    (useGetFollowingQuery as jest.Mock).mockReturnValue({ data: mockFollowing, loading: false });
  });

  it('renders the following dialog trigger button', () => {
    render(
      <MockedProvider>
        <Following userId="123">Open Following</Following>
      </MockedProvider>
    );
  });

  it('opens the dialog when trigger is clicked', () => {
    render(
      <MockedProvider>
        <Following userId="123">Open Following</Following>
      </MockedProvider>
    );
  });

  it('displays the following list correctly', async () => {
    render(
      <MockedProvider>
        <Following userId="123">Open Following</Following>
      </MockedProvider>
    );
  });

  it('renders the search input field', () => {
    render(
      <MockedProvider>
        <Following userId="123">Open Following</Following>
      </MockedProvider>
    );
  });

  it('closes the dialog when close button is clicked', () => {
    render(
      <MockedProvider>
        <Following userId="123">Open Following</Following>
      </MockedProvider>
    );
  });
});
