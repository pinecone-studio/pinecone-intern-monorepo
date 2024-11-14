import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import NewsFeed from '@/components/NewsFeed';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllPostsDocument } from '@/generated';

const mock: MockedResponse = {
  request: {
    query: GetAllPostsDocument,
  },
  result: {
    data: {
      getAllPosts: [
        {
          _id: '1',
          userId: '1',
          images: ['henlo'],
          caption: 'caption',
          likeCounts: 1,
          createdAt: 'date',
          updatedAt: 'date',
        },
      ],
    },
  },
};

describe('NewsFeed', () => {
  it('should render successfully', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[mock]}>
        <NewsFeed />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getAllByTestId('NewsFeed-PostCard')).toBeInTheDocument();
    });
  });
});
