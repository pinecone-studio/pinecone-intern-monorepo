import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
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
            _id: '134124',
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
    variables: { id: 'post1' },
  },
  result: {
    data: {
      message: 'Success',
    },
  },
};

jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));
describe('NewsFeed', () => {
  it('should render successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getPostsByFollowersIdMock, deletePostMock]}>
        <UserContext.Provider value={{ user: mockUser }}>
          <NewsFeed />
        </UserContext.Provider>
      </MockedProvider>
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const DeleteButton = getByTestId('deleteButton-post1');
    fireEvent.click(DeleteButton);

    const Delete = getByTestId('delete-post1');
    fireEvent.click(Delete);

    const DeletePost = getByTestId('deletePost-post1');
    fireEvent.click(DeletePost);
  });

  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[getPostsByFollowersIdMock, deletePostMock]} addTypename={false}>
        <UserContext.Provider value={{ user: mockUser }}>
          <NewsFeed />
        </UserContext.Provider>
      </MockedProvider>
    );
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
