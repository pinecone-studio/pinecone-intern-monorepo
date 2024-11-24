import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userContext } from '@/app/(main)/layout';
import { UsersMap } from '@/components/UsersMap';

describe('UsersMap', () => {
  it('should render a list of users', () => {
    // Mock users data
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
      {
        _id: '3',
        email: 'user3@example.com',
        username: 'user3',
        profilePicture: 'https://placekitten.com/202/200',
      },
      {
        _id: '4',
        email: 'user4@example.com',
        username: 'user4',
        profilePicture: 'https://placekitten.com/203/200',
      },
      {
        _id: '5',
        email: 'user5@example.com',
        username: 'user5',
        profilePicture: 'https://placekitten.com/204/200',
      },
      {
        _id: '6',
        email: 'user6@example.com',
        username: 'user6',
        profilePicture: 'https://placekitten.com/205/200',
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

    render(
      <userContext.Provider value={{ users: mockUsers, user: mockUser }}>
        <UsersMap />
      </userContext.Provider>
    );

    mockUsers.slice(0, 5).forEach((user) => {
      expect(screen.getByText(user.username)).toBeInTheDocument();
    });

    expect(screen.queryAllByText('Follow').length).toBe(5);
  });
});
