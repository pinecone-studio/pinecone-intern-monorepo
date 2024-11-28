import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { SearchDrawer } from '@/components/SearchDrawer';
import { GetUserBySearchDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

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

const getUserBySearchWithProfile = {
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
          profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s',
          username: 'altaa',
        },
      ],
    },
  },
};
const mockToggleDrawer = jest.fn();

const samplePropsWithVisitedUsers = {
  isOpen: true,
  toggleSearchDrawer: mockToggleDrawer,
  visitedUsers: [
    {
      _id: '2',
      fullname: 'odnoo',
      profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s',
      username: 'altaa',
    },
  ],
  visitedUsersHandler: jest.fn(),
};

const samplePropsWithoutVisitedUsers = {
  isOpen: false,
  toggleSearchDrawer: mockToggleDrawer,
  visitedUsers: [
    {
      _id: '2',
      fullname: 'odnoo',
      profilePicture: '',
      username: 'altaa',
    },
  ],
  visitedUsersHandler: jest.fn(),
};

describe('SearchDrawer', () => {
  it('Should get query successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getUserBySearchMock]} addTypename={false}>
        <SearchDrawer {...samplePropsWithVisitedUsers} />
      </MockedProvider>
    );

    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'alt' } });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const saveUser = getByTestId('to-profile-0');
    fireEvent.click(saveUser);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('isOpen false ', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getUserBySearchMock]} addTypename={false}>
        <SearchDrawer {...samplePropsWithVisitedUsers} />
      </MockedProvider>
    );

    const deleteVisitedUser = getByTestId('delete-one-0');
    fireEvent.click(deleteVisitedUser);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const deleteAll = getByTestId('delete-all');
    fireEvent.click(deleteAll);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('Clear search input', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getUserBySearchMock]} addTypename={false}>
        <SearchDrawer {...samplePropsWithVisitedUsers} />
      </MockedProvider>
    );

    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'alt' } });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const deleteButton = getByTestId('search-clear');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(searchInput.value).toEqual(''));
  });

  it('getUser By Search With Profile picture', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getUserBySearchWithProfile]} addTypename={false}>
        <SearchDrawer {...samplePropsWithoutVisitedUsers} />
      </MockedProvider>
    );
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'alt' } });
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it('Should get query successfully with visited user', async () => {
    render(
      <MockedProvider mocks={[getUserBySearchMock]} addTypename={false}>
        <SearchDrawer {...samplePropsWithVisitedUsers} />
      </MockedProvider>
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
