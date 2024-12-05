import Story from '@/components/Story';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

describe('Story Detail', () => {
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
                createdAt: undefined,
              },
              {
                _id: '675168f668ea2b7a405f57a7',
                createdAt: '2024-12-05T08:48:54.229Z',
                image: 'http://image',
                userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'image' },
              },
            ],
          },
          '673c49c6af669269e5cc56fd': {
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
                createdAt: undefined,
              },
              {
                _id: '675168f668ea2b7a405f57a7',
                createdAt: '2024-12-05T08:48:54.229Z',
                image: 'http://image',
                userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'image' },
              },
            ],
          },
          '673c49c6af669269e5cc5dffc': {
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
                createdAt: undefined,
              },
              {
                _id: '675168f668ea2b7a405f57a7',
                createdAt: '2024-12-05T08:48:54.229Z',
                image: 'http://image',
                userId: { _id: '673c49c6af669269e5cc56fc', username: 'gerle', profilePicture: 'image' },
              },
            ],
          },
        },
      })),
    };
  });
  it('it should show story detail', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <Story />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('StoryCard-0'));
    });
  });
});
