import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { userContext } from '@/app/(main)/layout';
import { UsersMap } from '@/components/UsersMap';
import { useCreateFollowersMutation } from '@/generated';
import userEvent from '@testing-library/user-event';

jest.mock('@/generated', () => ({
  useCreateFollowersMutation: jest.fn(),
}));

describe('UsersMap', () => {
  it('should render a list of users and allow following', async () => {
    const mockUsers = [
      {
        _id: '1',
        email: 'user1@example.com',
        username: 'user1',
        profilePicture: 'https://placekitten.com/200/200',
      },
      {
        _id: '2',
        email: 'user2@example.com',
        username: 'user2',
        profilePicture: 'https://placekitten.com/201/200',
      },
    ];

    const mockUser = {
      _id: '134124',
      email: '123@gmail.com',
      username: 'blabla',
      fullname: 'blabla',
      gender: 'blabla',
      password: 'blabla',
      profilePicture: 'blabla',
      bio: 'blabla',
      isPrivate: false,
      createdAt: 'blabla',
      updatedAt: 'blabla',
    };

    const mockCreateFollowers = jest.fn().mockResolvedValue({
      data: { createFollowers: { id: 'new-follower-id', followeeId: 'some-id' } },
    });
    useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);

    render(
      <userContext.Provider value={{ users: mockUsers, user: mockUser }}>
        <UsersMap />
      </userContext.Provider>
    );

    mockUsers.slice(0, 5).forEach((user) => {
      expect(screen.getByText(user.username)).toBeInTheDocument();
    });
    const followButtons = screen.getAllByRole('button', { name: /follow/i });

    await userEvent.click(followButtons[0]);

    await waitFor(() => {
      expect(mockCreateFollowers).toHaveBeenCalled();
    });
  });
});
