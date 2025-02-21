import { PrivateUser } from '@/features/profile/follow/PrivateUser';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
const mockUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockUseRouter,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
describe('PrivateUser components', () => {
  const baseMockDataNotOwner = {
    getUserTogether: {
      user: {
        _id: '12345',
        userName: 'john_doe',
        fullName: 'John Doe',
        bio: 'Software Engineer',
        profileImage: 'http:/image',
        hasStory: false,
        isPrivate: false,
        email: 'john@gmail.com',
        followingCount: 50,
        followerCount: 100,
        postCount: 5,
        friendshipStatus: {
          followedBy: false,
          following: false,
          incomingRequest: false,
          outgoingRequest: false,
        },
      },
      viewer: {
        _id: '12345',
        userName: 'viewer',
        fullName: 'viewer',
        bio: 'hi ',
        profileImage: 'http:/image',
      },
    },
  };

  it('should render PrivateUser', async () => {
    const user = userEvent.setup();
    render(<PrivateUser data={baseMockDataNotOwner} userId="12345" />);
    expect(await screen.findByTestId('private')).toBeInTheDocument();
    const editProfileButton = screen.getByTestId('edit-profile-button');
    await user.click(editProfileButton);
    expect(mockUseRouter).toHaveBeenCalledTimes(1);
  });
});
