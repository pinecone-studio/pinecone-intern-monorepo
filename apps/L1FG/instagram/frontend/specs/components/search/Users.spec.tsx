import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SavedSearchUserDocument, UserTogetherUserType } from '@/generated';
import { Users } from '@/components/search/Users';
import { useRouter } from 'next/navigation';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockUserName = jest.fn();

const savedUserMock: MockedResponse = {
  request: {
    query: SavedSearchUserDocument,
    variables: { input: { searchedUserId: '6793033930f7772deb7ef2c6' } },
  },
  result: {
    data: {
      savedUsers: ['6793033930f7772deb7ef2c6', '6793033930f7772deb7ef2c6'],
    },
  },
};

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

describe('Users Component', () => {
  it('should display "No users found" when no users are provided', () => {
    render(
      <MockedProvider mocks={undefined}>
        <Users users={undefined} setSearchOpen={Boolean} setUserName={mockUserName} />
      </MockedProvider>
    );
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

    render(
      <MockedProvider mocks={[savedUserMock]}>
        <Users users={mockUsers} setSearchOpen={Boolean} setUserName={mockUserName} />
      </MockedProvider>
    );
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
    ];

    render(
      <MockedProvider mocks={[savedUserMock]}>
        <Users users={mockUsers} setSearchOpen={setSearchOpenMock} setUserName={mockUserName} />
      </MockedProvider>
    );

    expect(screen.getByText('happy')).toBeInTheDocument();
  });

  it('calls clickUser and navigates to user profile on click', () => {
    render(
      <MockedProvider mocks={[savedUserMock]}>
        <Users users={mockUsers} setSearchOpen={setSearchOpenMock} setUserName={mockUserName} />
      </MockedProvider>
    );
    const userElement = screen.getByTestId('visit-profile');

    fireEvent.click(userElement);
    fireEvent.click(userElement);

    expect(setSearchOpenMock).toHaveBeenCalledWith(false);
    expect(mockUserName).toHaveBeenCalledWith('');

    expect(routerPushMock).toHaveBeenCalledWith('/6793033930f7772deb7ef2c6');
  });
});
