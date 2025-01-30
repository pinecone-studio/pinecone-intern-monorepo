import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserTogetherUserType } from '@/generated';
import { Users } from '@/components/search/Users';
import { useRouter } from 'next/navigation';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockSetSearchOpen = jest.fn();

describe('Users Component', () => {
  it('should display "No users found" when no users are provided', () => {
    render(<Users users={[]} setSearchOpen={mockSetSearchOpen} />);
    expect(screen.getByText('User not found')).toBeInTheDocument();
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

    render(<Users users={mockUsers} setSearchOpen={mockSetSearchOpen} />);
  });
});
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('Users Component', () => {
  const setSearchOpenMock = jest.fn();
  const routerPushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders users list correctly', () => {
    const mockUsers = [
      {
        _id: ' 1',
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
        userName: 'happy',
      },
      {
        _id: ' 2',
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
        userName: 'dda',
      },
    ];

    render(<Users users={mockUsers} setSearchOpen={setSearchOpenMock} />);

    expect(screen.getByText('happy')).toBeInTheDocument();

    expect(screen.getByText('dda')).toBeInTheDocument();
  });

  it('calls clickUser and navigates to user profile on click', () => {
    const mockUsers = [
      {
        _id: '6793033930f7772deb7ef2c6',
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

    render(<Users users={mockUsers} setSearchOpen={setSearchOpenMock} />);
    const userElement = screen.getByTestId('visit-profile');

    fireEvent.click(userElement);

    // setSearchOpen функц дуудагдсан эсэхийг шалгана
    expect(setSearchOpenMock).toHaveBeenCalledWith(false);

    // router.push дуудагдсан эсэхийг шалгана
    expect(routerPushMock).toHaveBeenCalledWith('/6793033930f7772deb7ef2c6');
  });
});
