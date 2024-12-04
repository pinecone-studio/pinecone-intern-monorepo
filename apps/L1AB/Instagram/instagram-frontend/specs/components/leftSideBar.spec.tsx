import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeftSideBar } from '@/components/LeftSideBar';
import { GetUserBySearchDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { UserContext } from '@/components/providers/UserProvider';

const getUserBySearchMock = {
  request: {
    query: GetUserBySearchDocument,
    variables: {
      searchInput: 'alt',
    },
  },
  result: {
    data: {
      getUserBySearch: [
        {
          _id: '2',
          fullname: 'odnoo',
          profilePicture: 'picture',
          username: 'altaa',
        },
      ],
    },
  },
};

describe('LeftSideBar', () => {
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
  it('1. Should toggle the search drawer when the SearchButton is clicked', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getUserBySearchMock]}>
        <UserContext.Provider value={{ user: mockUser, users: '', followers: '', sortedUsers: '' }}>
          <LeftSideBar />
        </UserContext.Provider>
      </MockedProvider>
    );
    const searchButton = getByTestId('search-click');
    const homeButton = getByTestId('homeButton');
    fireEvent.click(homeButton);
    fireEvent.click(searchButton);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const clearAll = getByTestId('delete-all');
    fireEvent.click(clearAll);
  });

  it('2. Should toggle the notif drawer', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getUserBySearchMock]}>
        <UserContext.Provider value={{ user: mockUser, users: '', followers: '', sortedUsers: '' }}>
          <LeftSideBar />
        </UserContext.Provider>
      </MockedProvider>
    );
    const notifyButton = getByTestId('notif-click');
    fireEvent.click(notifyButton);
  });
});
