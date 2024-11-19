import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import NewsFeed from '@/components/NewsFeed';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllPostsDocument } from '@/generated';
import { PropsType } from './PostCard.spec';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: PropsType) => <img src={src} alt={alt} />,
}));
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
          images: ['/https://picsum.photos/900/890', '/https://picsum.photos/900/890'],
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
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]}>
        <NewsFeed />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('NewsFeedPostCard-0'));
    });
  });
});
