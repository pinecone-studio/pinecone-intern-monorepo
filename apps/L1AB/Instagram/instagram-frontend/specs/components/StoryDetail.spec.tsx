import StoryDetail from '@/components/StoryDetail';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

const mock = {
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
        _id: '675168f668ea2b7a405f57a7',
        createdAt: '2024-12-05T08:48:54.229Z',
        image: 'http://image',
        userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'http://image' },
      },
    ],
  },
};

jest.mock('@/components/providers/StoryProvider', () => {
  const actual = jest.requireActual('@/components/providers/StoryProvider');
  return {
    ...actual,
    useStory: jest.fn(() => ({
      groupedStories: mock,
    })),
  };
});

describe('StoryDetail Component', () => {
  it('should render successfully', () => {
    const props = { userId: '673c49c6af669269e5cc56fc', setUserId: jest.fn() };
    render(
      <MockedProvider>
        <StoryDetail {...props} />
      </MockedProvider>
    );
  });
});
