import { Days } from '@/features/notification/Days';
import { GetNotificationDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { prettyDOM, render, screen } from '@testing-library/react';

const getNotificationMock: MockedResponse = {
  request: {
    query: GetNotificationDocument,
  },
  result: {
    data: {
      getNotification: {
        today: {
          postLike: [
            {
              id: null,
              contentPostId: '67a44ef8c446d6b020be78ed',
              contentCommentId: '3',
              contentStoryId: null,
              isRead: false,
              user: {
                _id: '678e1e9179fd42a3a41c8dfe',
                latestStoryTimestamp: '123456789',
                seenStoryTime: '123456789',
                userName: 'aan',
                profileImage: 'user.png',
              },
              contentPost: '.png',
            },
          ],
          comment: [
            {
              id: '12',
              contentPostId: null,
              contentCommentId: '67a1bb005e8dc33868338996',
              contentStoryId: null,
              isRead: false,
              user: {
                _id: '22',
                latestStoryTimestamp: '123456789',
                seenStoryTime: '123456789',
                userName: 'aan',
                profileImage: 'user.png',
              },
              contentPost: '.png',
            },
          ],
          request: [
            {
              id: null,
              contentPostId: null,
              contentCommentId: null,
              contentStoryId: '6791cd5c58ed14784833801b',
              isRead: false,
              user: {
                _id: '22',
                latestStoryTimestamp: '123456789',
                seenStoryTime: '123456789',
                userName: 'aan',
                profileImage: 'user.png',
              },
              contentPost: '.png',
            },
          ],
        },
        thisWeek: null,
        earlier: null,
      },
    },
  },
};

describe('get all data for notification', () => {
  it('mockprovider data', async () => {
    render(
      <MockedProvider mocks={[getNotificationMock]} addTypename={false}>
        <Days />
      </MockedProvider>
    );
    console.log(prettyDOM());
    // expect(await screen.findByTestId('thisWeek')).toBeInTheDocument();
    // expect(await screen.findByTestId('earlier')).toBeInTheDocument();
  });

  it('mockprovider data', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Days />
      </MockedProvider>
    );
    const data = screen.getByTestId('data-obso');
    expect(data).toBeDefined();
  });
});
