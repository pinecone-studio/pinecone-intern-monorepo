import { FollowersDialogRemove } from '@/components/FollowersDialogRemove';
import { UserContext } from '@/components/providers';
import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/components/RemoveFollowersDialog', () => ({
  RemoveFollowersDialog: jest.fn(() => <div>Remove Dialog</div>),
}));

describe('FollowersDialogRemove', () => {
  const mockHandleRemoveFollowing = jest.fn();
  const mockHandleRemoveFollower = jest.fn();

  const profileUser = { _id: 'profile-id', username: 'profileuser' };
  const defaultProps = {
    id: 'user-id',
    name: 'User Name',
    img: 'img-url',
    fullname: 'User Full Name',
    suggest: 'Suggested User',
    type: 'followers',
    profileUser,
    handleRemoveFollowing: mockHandleRemoveFollowing,
    handleRemoveFollower: mockHandleRemoveFollower,
  };

  beforeEach(() => {
    mockHandleRemoveFollowing.mockClear();
    mockHandleRemoveFollower.mockClear();
  });

  it('renders the avatar, name, and optional fullname and suggest', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('currentuser'),
    });
    render(
      <UserContext.Provider value={{ user: { username: 'currentuser' } }}>
        <FollowersDialogRemove {...defaultProps} />
      </UserContext.Provider>
    );

    expect(screen.getByText('User Name'));

    expect(screen.getByText('User Name'));

    expect(screen.getByText('User Full Name'));

    expect(screen.getByText('Suggested User'));
  });

  it('renders RemoveFollowersDialog when the username matches', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('currentuser'),
    });

    render(
      <UserContext.Provider value={{ user: { username: 'currentuser' } }}>
        <FollowersDialogRemove {...defaultProps} />
      </UserContext.Provider>
    );
  });

  it('renders Follow button when the username does not match', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('otheruser'),
    });

    render(
      <UserContext.Provider value={{ user: { username: 'currentuser' } }}>
        <FollowersDialogRemove {...defaultProps} />
      </UserContext.Provider>
    );
  });
});
