import StoryDetail from '@/components/StoryDetail';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

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
describe('Story Detail', () => {
  it('it should show story detail', () => {
    const props = { userId: '1', setUserId: '2' };
    const { getByText } = render(
      <MockedProvider>
        <StoryDetail {...props} />
      </MockedProvider>
    );
  });
});
