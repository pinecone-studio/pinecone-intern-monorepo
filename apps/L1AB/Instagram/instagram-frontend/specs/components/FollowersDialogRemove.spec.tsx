import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCreateFollowersMutation, useDeleteFollowerMutation } from '@/generated';
import { UserContext } from '../../src/components/providers/UserProvider';
import { FollowersDialogRemove } from '@/components/FollowersDialogRemove';
import { RemoveFollowersDialog } from '@/components/RemoveFollowersDialog';

jest.mock('@/generated', () => ({
  useCreateFollowersMutation: jest.fn(),
  useDeleteFollowerMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'type') return 'followers';
      if (key === 'username') return 'bla2';
      return null;
    }),
  })),
}));

jest.mock('@/components/RemoveFollowersDialog', () => ({
  RemoveFollowersDialog: jest.fn(() => <div>RemoveFollowersDialog Mock</div>),
}));

const mockUserContext = {
  user: { _id: 'user1', username: 'testuser' },
  sortedUsers: [{ _id: 'user2', username: 'followee' }],
};

const mockCreateFollowers = jest.fn();
const mockDeleteFollower = jest.fn();

useCreateFollowersMutation.mockReturnValue([mockCreateFollowers]);
useDeleteFollowerMutation.mockReturnValue([mockDeleteFollower]);

describe('FollowersDialogRemove', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('1 renders the component correctly', () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <FollowersDialogRemove
          id="user2"
          name="followee"
          img="image.jpg"
          fullname="Followee Fullname"
          suggest="Suggested"
          type="followers"
          profileUser={{ _id: 'user1', username: 'testuser' }}
          handleRemoveFollowing={jest.fn()}
          handleRemoveFollower={jest.fn()}
        />
      </UserContext.Provider>
    );
    expect(screen.getByText('followee'));
    expect(screen.getByText('Followee Fullname'));
    expect(screen.getByText('Suggested'));
  });

  it('4 calls createFollowers mutation when follow button is clicked', async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <FollowersDialogRemove
          id="user3"
          name="followee"
          img="image.jpg"
          fullname="Followee Fullname"
          suggest="Suggested"
          type="followers"
          profileUser={{ _id: 'user1', username: 'testuser' }}
          handleRemoveFollowing={jest.fn()}
          handleRemoveFollower={jest.fn()}
        />
      </UserContext.Provider>
    );
    fireEvent.click(screen.getByText('Following'));
    expect(mockDeleteFollower).toHaveBeenCalledWith({
      variables: { followerId: 'user1', followeeId: 'user3' },
    });
  });

  it('5 calls deleteFollower mutation when unfollow button is clicked', async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <FollowersDialogRemove
          id="user2"
          name="followee"
          img="image.jpg"
          fullname="Followee Fullname"
          suggest="Suggested"
          type="followers"
          profileUser={{ _id: 'user1', username: 'testuser' }}
          handleRemoveFollowing={jest.fn()}
          handleRemoveFollower={jest.fn()}
        />
      </UserContext.Provider>
    );

    fireEvent.click(screen.getByText('Follow'));

    expect(mockCreateFollowers).toHaveBeenCalledWith({
      variables: { followerId: 'user1', followeeId: 'user2' },
    });
  });

  it('6 user with return null', async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <FollowersDialogRemove
          id="user1"
          name="followee"
          img="image.jpg"
          fullname="Followee Fullname"
          suggest="Suggested"
          type="followers"
          profileUser={{ _id: 'user1', username: 'testuser' }}
          handleRemoveFollowing={jest.fn()}
          handleRemoveFollower={jest.fn()}
        />
      </UserContext.Provider>
    );
  });

  it('7 user with return null', async () => {
    render(
      <UserContext.Provider value={mockUserContext}>
        <FollowersDialogRemove
          id="user2"
          name="testuser"
          img="image.jpg"
          fullname="Followee Fullname"
          suggest="Suggested"
          type="followers"
          profileUser={{ _id: 'user1', username: 'testuser' }}
          handleRemoveFollowing={jest.fn()}
          handleRemoveFollower={jest.fn()}
        />
      </UserContext.Provider>
    );
    expect(RemoveFollowersDialog);
  });
});
