import '@testing-library/jest-dom';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import NewsFeed from '@/components/NewsFeed';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllPostsDocument } from '@/generated';

const images: MockedResponse = {
  request: {
    query: GetAllPostsDocument,
  },
  result: {
    data: {
      getAllPosts: [
        {
          _id: '1',
          userId: '1',
          images: ['henlo', 'bye'],
          caption: 'caption',
          likeCounts: 1,
          createdAt: 'date',
          updatedAt: 'date',
        },
      ],
    },
  },
};
describe('Profile', () => {
  it('should render successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[images]}>
        <NewsFeed />
      </MockedProvider>
    );

    const PostCardNextButtonId = getByTestId('PostCardNextButtonId');
    fireEvent.click(PostCardNextButtonId);
  });
});
