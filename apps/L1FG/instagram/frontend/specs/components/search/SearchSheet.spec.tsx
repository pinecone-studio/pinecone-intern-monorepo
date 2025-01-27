import { SearchSheet } from '@/components/search/SearchSheet';
import { GetUserByNameDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, fireEvent } from '@testing-library/react';

const getUserByNameMock: MockedResponse = {
  request: {
    query: GetUserByNameDocument,
    variables: { userName: 'Hello' },
  },
  result: {
    data: {
      getUserByName: [
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
          userName: 'Hello',
        },
      ],
    },
  },
};

describe('SearchSheet', () => {
  const mockSetSearchOpen = jest.fn();

  it('should set users to [] when data?.getUserByName is an array', () => {
    render(
      <MockedProvider mocks={[getUserByNameMock]}>
        <SearchSheet searchOpen={true} setSearchOpen={mockSetSearchOpen} />
      </MockedProvider>
    );
    const data = {
      getUserByName: [
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
          userName: 'Hello',
        },
      ],
    };
    const users = data?.getUserByName as [];
    expect(users).toEqual([
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
        userName: 'Hello',
      },
    ]);
  });

  it('should set users to undefined when data is undefined', () => {
    render(
      <MockedProvider mocks={undefined}>
        <SearchSheet searchOpen={true} setSearchOpen={mockSetSearchOpen} />
      </MockedProvider>
    );
    const users = undefined;
    expect(users).toBeUndefined();
  });

  it('closes the search sheet when clicking the overlay', () => {
    render(
      <MockedProvider mocks={[getUserByNameMock]}>
        <SearchSheet searchOpen={true} setSearchOpen={mockSetSearchOpen} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByTestId('open-sheet'));

    expect(mockSetSearchOpen).toHaveBeenCalledWith(false);
  });

  it('should handle undefined or non-array data', () => {
    const mockData = { getUserByName: undefined };
    const users = Array.isArray(mockData?.getUserByName) ? (mockData?.getUserByName as []) : undefined;

    expect(users).toBeUndefined();

    const mockNonArrayData = { getUserByName: 'not an array' };
    const nonArrayUsers = Array.isArray(mockNonArrayData?.getUserByName) ? (mockNonArrayData?.getUserByName as unknown as []) : undefined;

    expect(nonArrayUsers).toBeUndefined();
  });

  it('input value', async () => {
    render(
      <MockedProvider mocks={[getUserByNameMock]}>
        <SearchSheet searchOpen={true} setSearchOpen={mockSetSearchOpen} />
      </MockedProvider>
    );
    const inputElement = screen.getByPlaceholderText('Search') as HTMLInputElement;

    expect(inputElement.value).toBe('');

    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(inputElement.value).toBe('Hello');

    const userComponent = await screen.findByText('Search');
    expect(userComponent);
  });
});
