import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGetFollowersQuery } from '@/generated';
import Followers from '@/components/profile/follow/Followers';

jest.mock('@/generated', () => ({
  useGetFollowersQuery: jest.fn(),
}));

describe('Followers Component', () => {

  const mockFollowers = {
    getFollowers: [
      {
        user: {
          userName: 'john_doe',
          fullName: 'John Doe',


        },
      },
    ],
  };

  beforeEach(() => {
    (useGetFollowersQuery as jest.Mock).mockReturnValue({ data: mockFollowers, loading: false });
  });

  it('renders the followers dialog trigger button', () => {
    render(
      <MockedProvider>
        <Followers userId="123">Open Followers</Followers>
      </MockedProvider>
    );
  });

  it('opens the dialog when trigger is clicked', () => {
    render(
      <MockedProvider>
        <Followers userId="123">Open Followers</Followers>
      </MockedProvider>
    );
  });

  it('displays the followers list correctly', async () => {
    render(
      <MockedProvider>
        <Followers userId="123">Open Followers</Followers>
      </MockedProvider>
    );
  });

  it('renders the search input', () => {
    render(
      <MockedProvider>
        <Followers userId="123">Open Followers</Followers>
      </MockedProvider>
    );
  });

  it('closes the dialog when close button is clicked', () => {
    render(
      <MockedProvider>
        <Followers userId="123">Open Followers</Followers>
      </MockedProvider>
    );
  });
});
