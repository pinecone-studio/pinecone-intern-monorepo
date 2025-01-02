import { render, screen, act } from '@testing-library/react';
import Matches from '@/components/chat/Matches';
import * as generatedHooks from '@/generated';

jest.mock('@/generated', () => ({
  useGetMatchedUsersQuery: jest.fn(),
  useGetUserByIdQuery: jest.fn(),
}));

const mockLocalStorage = {
  getItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Matches', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render matches and update with user details', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'authId' }));

    const mockMatchedUsers = [
      { _id: 'match1', targetUserId: 'user1' },
      { _id: 'match2', targetUserId: 'user2' },
    ];

    const mockUserDetails = {
      _id: 'user1',
      username: 'User One',
      age: 25,
      profession: 'Engineer',
      images: ['https://example.com/image1.jpg'],
    };

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({
      data: { getMatchedUsers: mockMatchedUsers },
      loading: false,
    });

    let getUserByIdCallback: () => { data: { getUserById: typeof mockUserDetails } };
    (generatedHooks.useGetUserByIdQuery as jest.Mock).mockImplementation(() => {
      getUserByIdCallback = getUserByIdCallback || jest.fn().mockReturnValue({ data: { getUserById: mockUserDetails } });
      return getUserByIdCallback();
    });

    await act(async () => {
      render(<Matches />);
    });

    // await waitFor(() => {
    //   expect(screen.queryByText('Loading...')).not;
    // });

    expect(screen.queryAllByText('User One'));
    expect(screen.queryAllByText(', 25'));
    expect(screen.queryAllByText('Engineer'));
    expect(screen.queryAllByText('img'));

    // Simulate updating user details for the second match
    const updatedUserDetails = {
      _id: 'user2',
      username: 'User Two',
      age: 30,
      profession: 'Designer',
      images: ['https://example.com/image2.jpg'],
    };

    await act(async () => {
      getUserByIdCallback({ variables: { userId: 'user2' } });
      (generatedHooks.useGetUserByIdQuery as jest.Mock).mockReturnValue({
        data: { getUserById: updatedUserDetails },
      });
    });
  });

  it('should handle no authId', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
    });

    render(<Matches />);

    // await waitFor(() => {
    //   expect(screen.queryByText('Loading...')).not;
    // });

    // expect(screen.queryByRole('img')).not;
  });

  it('should show loading state', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'authId' }));

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({
      loading: true,
    });

    render(<Matches />);

    expect(screen.getByText('Loading...'));
  });

  it('should handle no matches', async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ _id: 'authId' }));

    (generatedHooks.useGetMatchedUsersQuery as jest.Mock).mockReturnValue({
      data: { getMatchedUsers: [] },
      loading: false,
    });

    render(<Matches />);

    // await waitFor(() => {
    //   expect(screen.queryByText('Loading...')).not;
    // });

    // expect(screen.queryByRole('img')).not;
  });
});
