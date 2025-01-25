import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserTogetherUserType } from '@/generated';
import { Users } from '@/components/search/Users';

describe('Users Component', () => {
  it('should display "No users found" when no users are provided', () => {
    render(<Users users={[]} />);
    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });

  it('should render a list of users', () => {
    const mockUsers: UserTogetherUserType[] | undefined = [
      {
        _id: ' string',
        bio: '',
        email: '',
        followerCount: 1,
        followingCount: 1,
        friendshipStatus: { followedBy: false },
        fullName: '',
        gender: undefined,
        hasStory: false,
        isPrivate: false,
        postCount: 1,
        profileImage: '',
        userName: '',
      },
    ];

    render(<Users users={mockUsers} />);
  });
});
