import { Days } from '@/components/notifications/Days';
import { GetNotificationDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const getNotificationMock: MockedResponse = {
  request: {
    query: GetNotificationDocument,
  },
  result: {
    data: {
      getNotification: {
        today: [
          {
            categoryType: 'COMMENT_POST',
            postContent: '.png',
            contentCommentId: '1',
            contentPostId: '123',
            contentStoryId: '',
            id: '12',
            isRead: false,
            ownerId: '1',
            user: {
              userName: 'search',
              profileImage: 'pro.png',
              latestStoryTimestamp: '2025',
              seenStoryTime: '2200',
              _id: '21',
            },
          },
        ],
        thisWeek: [
          {
            categoryType: 'COMMENT_POST',
            postContent: '.png',
            contentCommentId: '1',
            contentPostId: '123',
            contentStoryId: '',
            id: '12',
            isRead: false,
            ownerId: '1',
            user: {
              userName: 'search',
              profileImage: 'pro.png',
              latestStoryTimestamp: '2025',
              seenStoryTime: '2200',
              _id: '21',
            },
          },
        ],
        earlier: [
          {
            categoryType: 'COMMENT_POST',
            postContent: '.png',
            contentCommentId: '1',
            contentPostId: '123',
            contentStoryId: '',
            id: '12',
            isRead: false,
            ownerId: '1',
            user: {
              userName: 'search',
              profileImage: 'pro.png',
              latestStoryTimestamp: '2025',
              seenStoryTime: '2200',
              _id: '21',
            },
          },
        ],
      },
    },
  },
};

describe('get all data for notification', () => {
  it('mockprovider data', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[getNotificationMock]} addTypename={false}>
          <Days />
        </MockedProvider>
      );
    });

    await waitFor(() => {
      screen.debug();
    });
  });

  it('mockprovider data', async () => {
    render(
      <MockedProvider mocks={undefined} addTypename={false}>
        <Days />
      </MockedProvider>
    );
    const data = screen.getByTestId('data-obso');
    expect(data).toBeDefined();
  });
});
