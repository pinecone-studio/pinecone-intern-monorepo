/* eslint-disable max-lines */
import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UserStory } from '@/components/UserStory';
import { DeleteStoryDocument, GetAllStoriesDocument } from '@/generated';
import { useRouter } from 'next/navigation';

jest.mock('@/components/providers', () => {
  const actual = jest.requireActual('@/components/providers');
  return {
    ...actual,
    useStory: jest.fn(() => ({
      groupedStories: {
        '673c49c6af669269e5cc56fc': {
          userId: {
            _id: '673c49c6af669269e5cc56fc',
            username: 'gerle',
            profilePicture: 'http://image',
          },
          stories: [
            {
              _id: '675168f668ea2b7a405f57a7',
              userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
              image: 'http://image',
              createdAt: '2024-12-05T08:48:54.229Z',
            },
            {
              _id: '675168f668ea2b7a405f57a7aa',
              createdAt: '2024-12-05T08:48:54.229Z',
              image: 'http://image',
              userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
            },
          ],
        },
        '673c49c6af669269e5cc56faac': {
          userId: {
            _id: '673c49c6af669269e5cc56fc',
            username: 'gerle',
            profilePicture: 'http://image',
          },
          stories: [
            {
              _id: '675168f668ea2b7a405f57a7',
              userId: { _id: '673c49c6af669269e5cc56fa', username: 'gerle', profilePicture: 'http://image' },
              image: 'http://image',
              createdAt: '2024-12-05T08:48:54.229Z',
            },
            {
              _id: '675168f668ea2b7a405f57a7aa',
              createdAt: '2024-12-05T08:48:54.229Z',
              image: 'http://image',
              userId: { _id: '673c49c6af669269e5cc56fa', username: 'gerle', profilePicture: 'http://image' },
            },
          ],
        },
      },
    })),
    useUser: jest.fn(() => ({
      user: {
        _id: '673c49c6af669269e5cc56fc',
        email: '123@gmail.com',
        username: 'Zorg',
        fullname: 'Enkhzorig',
        gender: 'blabla',
        password: 'blabla',
        profilePicture: 'blabla',
        bio: 'blabla',
        isPrivate: false,
        createdAt: 'blabla',
        updatedAt: 'blabla',
      },
    })),
  };
});

const deleteStoryMock = {
  request: {
    query: DeleteStoryDocument,
    variables: { input: { _id: '675168f668ea2b7a405f57a7', userId: '673c49c6af669269e5cc56fc' } },
  },
  result: {
    data: {},
  },
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  formatDistanceToNow: jest.fn(),
}));

const getAllStoriesMock = {
  request: {
    query: GetAllStoriesDocument,
  },
  result: {
    data: {
      getAllStories: [
        {
          _id: '675168f668ea2b7a405f57a7',
          userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
          image: 'http://image',
          createdAt: undefined,
        },
      ],
    },
  },
  newData: () => {
    return {
      data: {
        getAllStories: [
          {
            _id: '675168f668ea2b7a405f57a7',
            userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
            image: 'http://image',
            createdAt: undefined,
          },
        ],
      },
    };
  },
};

describe('User Story', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      pathname: '/home',
    });
  });
  const props = {
    userId: '673c49c6af669269e5cc56fc',
    stories: [
      {
        _id: '675168f668ea2b7a405f57a7',
        createdAt: '2024-12-05T08:48:54.229Z',
        image: 'http://image',
        userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
      },
    ],
    username: 'gerle',
    profilePicture: 'http://image',
    prevUser: jest.fn(),
    nextUser: jest.fn(),
    mainUserStory: '673c49c6af669269e5cc56fc',
  };

  it('should render user stories correctly 1', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[deleteStoryMock]}>
        <UserStory {...props} />
      </MockedProvider>
    );

    const prev = getByTestId('PrevButton');
    const next = getByTestId('NextButton');
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(prev);
    fireEvent.click(prev);
    fireEvent.click(prev);
  });

  it('should render user stories correctly 2', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[deleteStoryMock]}>
        <UserStory {...props} />
      </MockedProvider>
    );

    const prev = getByTestId('PrevButton');
    const next = getByTestId('NextButton');
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(prev);
    fireEvent.click(prev);
    fireEvent.click(prev);
  });
  it('Should render successfully 3', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[deleteStoryMock, getAllStoriesMock]}>
        <UserStory {...props} />
      </MockedProvider>
    );
    const deleteTrigger = getByTestId('deleteTrigger');
    fireEvent.click(deleteTrigger);
    const deleteStory = getByTestId('deleteStory');
    fireEvent.click(deleteStory);
    const deleteButton = getByTestId('deleteButton');
    fireEvent.click(deleteButton);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });

  it('Should render successfully 4 ', async () => {
    render(
      <MockedProvider>
        <UserStory
          {...{
            userId: '673c49c6af669269e5cc56fc',
            stories: [
              {
                _id: '675168f668ea2b7a405f57a7',
                createdAt: '2024-12-05T08:48:54.229Z',
                image: 'http://image',
                userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
              },
            ],
            username: 'gerle',
            profilePicture: 'http://image',
            prevUser: jest.fn(),
            nextUser: jest.fn(),
            mainUserStory: '673c49c6af669269e5cc56ff',
          }}
        />
      </MockedProvider>
    );
  });

  it('Should render successfully 5', async () => {
    render(
      <MockedProvider>
        <UserStory
          {...{
            userId: '673c49c6af669269e5cc56faac',
            stories: [
              {
                _id: '675168f668ea2b7a405f57a7',
                createdAt: '2024-12-05T08:48:54.229Z',
                image: 'http://image',
                userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
              },
            ],
            username: 'gerle',
            profilePicture: 'http://image',
            prevUser: jest.fn(),
            nextUser: jest.fn(),
            mainUserStory: '673c49c6af669269e5cc56fc',
          }}
        />
      </MockedProvider>
    );
  });
});
