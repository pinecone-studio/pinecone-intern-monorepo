import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UserStory } from '@/components/UserStory';

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
              userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'image' },
              image: 'http://image',
              createdAt: '2024-12-05T08:48:54.229Z',
            },
          ],
        },
      },
    })),
  };
});

describe('User Story', () => {
  it('should render user stories correctly', () => {
    const props = {
      userId: '673c49c6af669269e5cc56fc',
      stories: [
        {
          _id: '675168f668ea2b7a405f57a7',
          createdAt: '2024-12-05T08:48:54.229Z',
          image: 'http://image',
          userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'image' },
        },
      ],
      username: 'gerle',
      profilePicture: 'http://image',
      prevUser: jest.fn(),
      nextUser: jest.fn(),
      mainUserStory: '673c49c6af669269e5cc56fc',
    };

    const { getByText } = render(
      <MockedProvider>
        <UserStory {...props} />
      </MockedProvider>
    );
  });
});
