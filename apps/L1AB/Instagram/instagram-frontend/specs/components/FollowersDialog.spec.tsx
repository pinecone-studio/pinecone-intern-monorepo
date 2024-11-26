import { render } from '@testing-library/react';
import { FollowersDialog } from '@/components/FollowersDialog';
import { userContext } from '@/app/(main)/layout';

jest.mock('@/components/FollowersDialogRemove', () => ({
  FollowersDialogRemove: jest.fn(() => <div>FollowersDialogRemove</div>),
}));

describe('FollowersDialog', () => {
  const mockUsers = [
    { _id: '1', username: 'test1', profilePicture: '/avatar1.jpg', fullname: 'Test One' },
    { _id: '2', username: 'test2', profilePicture: '/avatar2.jpg', fullname: 'Test Two' },
    { _id: '3', username: 'test3', profilePicture: '/avatar3.jpg', fullname: 'Test Three' },
  ];

  const mockFollowers = [{ followerId: '1' }, { followerId: '2' }, { followerId: '3' }];

  it('renders correctly with mocked followers', () => {
    render(
      <userContext.Provider value={{ users: mockUsers }}>
        <FollowersDialog followers={mockFollowers} />
      </userContext.Provider>
    );
  });
});
