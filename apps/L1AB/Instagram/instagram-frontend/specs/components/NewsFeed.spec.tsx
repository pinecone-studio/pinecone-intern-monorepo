import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import NewsFeed from '@/components/NewsFeed';
import { MockedProvider } from '@apollo/client/testing';
import { GetPostsByFollowersIdDocument } from '@/generated';
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
      ],
    },
  },
};

describe('NewsFeed', () => {
  it('should render successfully', async () => {
    const { getByTestId } = render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MockedProvider mocks={[getPostsByFollowersIdMock]}>
          <NewsFeed />
        </MockedProvider>
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(getByTestId('NewsFeedPostCard-0'));
    });
  });

  it('should render successfully', async () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <MockedProvider mocks={[getPostsByFollowersIdMock]}>
          <NewsFeed />
        </MockedProvider>
      </UserContext.Provider>
    );
  });
});
