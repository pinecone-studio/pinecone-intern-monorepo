import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { UsersMap } from '@/components/UsersMap';
import { CreateFollowersDocument, GetSuggestedUsersDocument } from '@/generated';
import { UserContext } from '@/components/providers';
import { MockedProvider } from '@apollo/client/testing';

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
export const getSuggestedUsers = {
  request: {
    query: GetSuggestedUsersDocument,
    variables: {
      id: '134124',
    },
  },
  result: {
    data: {
      getSuggestedUsers: [
        {
          _id: '1',
          followeeId: {
            _id: '11',
            profilePicture: '/zurag',
            username: 'zor',
          },
          followerId: {
            _id: '12',
            profilePicture: '/zurag',
          },
          createdAt: '2023-10-01',
        },
        {
          _id: '2',
          followeeId: {
            _id: '11',
            profilePicture: '/zurag',
            username: 'zor',
          },
          followerId: {
            _id: '14',
            profilePicture: '/zurag',
          },
          createdAt: '2023-10-01',
        },
        {
          _id: '99',
          followeeId: {
            _id: '11',
            profilePicture: '/zurag',
            username: 'gerlee',
          },
          followerId: {
            _id: '14',
            profilePicture: '/zurag',
          },
          createdAt: '2023-10-01',
        },
      ],
    },
  },
};
const getSuggestedUsersWithNoData = {
  request: {
    query: GetSuggestedUsersDocument,
    variables: {
      id: '134124',
    },
  },
  result: {
    data: undefined,
  },
};

const createFollowMock = {
  request: {
    query: CreateFollowersDocument,
    variables: {
      followerId: '134124',
      followeeId: '11',
    },
  },
  result: {
    data: {
      createComment: {
        _id: '1',
        comment: 'Great post!',
        updatedAt: 'user123',
        createdAt: '2023-10-01',
      },
    },
  },
};
describe('UsersMap', () => {
  it('should render a list of users and allow following', async () => {
    const { getByTestId } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MockedProvider mocks={[getSuggestedUsers, createFollowMock]}>
          <UsersMap />
        </MockedProvider>
      </UserContext.Provider>
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const followButton = getByTestId('follow-0');
    fireEvent.click(followButton);
  });
  it('should render a list of users and allow following', async () => {
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MockedProvider mocks={[getSuggestedUsersWithNoData]}>
          <UsersMap />
        </MockedProvider>
      </UserContext.Provider>
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });
});
