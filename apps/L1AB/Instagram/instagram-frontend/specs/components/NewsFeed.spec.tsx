import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import NewsFeed from '@/components/NewsFeed';
import { MockedProvider } from '@apollo/client/testing';
import { DeletePostDocument, GetPostsByFollowersIdDocument } from '@/generated';
import { PropsType } from './PostCard.spec';
import { UserContext } from '@/components/providers';
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

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: PropsType) => <img src={src} alt={alt} />,
}));
const getPostsByFollowersIdMock = {
  request: {
    query: GetPostsByFollowersIdDocument,
    variables: {
      followerId: '134124',
    },
  },
  result: {
    data: {
      getPostsByFollowersId: [
        {
          _id: 'post1',
          userId: {
            username: 'zorigoo',
            _id: 'zorID',
            profilePicture: 'zurag',
          },
          images: ['zurag'],
          caption: 'noCap',
          createdAt: 'date',
        },
        {
          _id: 'post2',
          userId: {
            username: 'zorigoo',
            _id: 'zorID',
            profilePicture: 'zurag',
          },
          images: ['zurag'],
          caption: 'noCap',
          createdAt: 'date',
        },
      ],
    },
  },
};
export const deletePostMock = {
  request: {
    query: DeletePostDocument,
    variables: { id: '1' },
  },
  result: {
    data: {
      message: 'Success',
    },
  },
};
const mockPosts = [
  {
    _id: '1',
    userId: { _id: '134124', profilePicture: 'profile.jpg', username: 'user1' },
    createdAt: '2023-10-01',
    caption: 'Test Post 1',
    images: ['image1.jpg'],
  },
  {
    _id: '2',
    userId: { _id: 'user2', profilePicture: 'profile.jpg', username: 'user2' },
    createdAt: '2023-10-02',
    caption: 'Test Post 2',
    images: ['image2.jpg'],
  },
];
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));
describe('NewsFeed', () => {
  it('should render successfully', async () => {
    localStorage.setItem('new posts', JSON.stringify(mockPosts));
    const { getByTestId } = render(
      <MockedProvider mocks={[getPostsByFollowersIdMock, deletePostMock]}>
        <UserContext.Provider value={{ user: mockUser }}>
          <NewsFeed />
        </UserContext.Provider>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('NewsFeedPostCard-post1'));
    });
    const DeleteButton = getByTestId('deleteButton-1');
    fireEvent.click(DeleteButton);

    const Delete = getByTestId('delete-1');
    fireEvent.click(Delete);

    const DeletePost = getByTestId('deletePost-1');
    fireEvent.click(DeletePost);
  });

  it('should render successfully', async () => {
    const postString = JSON.stringify(null);
    localStorage.setItem('new posts', postString);
    const { getByTestId } = render(
      <MockedProvider mocks={[getPostsByFollowersIdMock, deletePostMock]} addTypename={false}>
        <UserContext.Provider value={{ user: mockUser }}>
          <NewsFeed />
        </UserContext.Provider>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('NewsFeedPostCard-post1'));
    });
  });
  it('should render successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getPostsByFollowersIdMock, deletePostMock]} addTypename={false}>
        <UserContext.Provider value={{ user: mockUser }}>
          <NewsFeed />
        </UserContext.Provider>
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('NewsFeedPostCard-post1'));
    });
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    JSON.parse(localStorage.getItem('new posts') ?? '[]');
  });

  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[getPostsByFollowersIdMock, deletePostMock]}>
        <UserContext.Provider value={{ user: null }}>
          <NewsFeed />
        </UserContext.Provider>
      </MockedProvider>
    );
  });
});
