import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGetAllConversationsQuery } from '@/generated';
import { useSearchParams } from 'next/navigation';
import Matches from '@/components/chat/Matches';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useGetAllConversationsQuery: jest.fn(),
  useAddMessageMutation: jest.fn().mockReturnValue([jest.fn()]),
  useUnMatchMutation: jest.fn().mockReturnValue([jest.fn()]),
  useGetConversationQuery: jest.fn().mockReturnValue({
    data: {
      conversation: {
        /* mock conversation data */
      },
    },
  }),
}));

describe('Matches component', () => {
  it('should render matches and handle add to recent chats with userTwo correctly', () => {
    const handleAddToRecentChats = jest.fn();
    const matches = [
      {
        targetUserId: { _id: '1', images: ['image1.png'], username: 'User1', age: 25, profession: 'Engineer' },
        userId: { _id: '2' },
      },
      {
        targetUserId: { _id: '3', images: ['image3.png'], username: 'User3', age: 30, profession: 'Designer' },
        userId: { _id: '4' },
      },
    ];

    // Mocking the return value of useSearchParams to return 'User1'
    useSearchParams.mockReturnValue({ get: jest.fn().mockReturnValue('User1') });

    // Mocking the query response with userTwo and userOne information
    useGetAllConversationsQuery.mockReturnValue({
      data: {
        getAllConversations: [
          {
            userOne: { _id: '2', username: 'User2', images: ['image2.png'] },
            userTwo: { _id: '1', username: 'User1', images: ['image1.png'] },
          },
          {
            userOne: { _id: '4', username: 'User4', images: ['image4.png'] },
            userTwo: { _id: '3', username: 'User3', images: ['image3.png'] },
          },
        ],
      },
    });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Matches handleAddToRecentChats={handleAddToRecentChats} matches={matches} user={{ _id: '2' }} />
      </MockedProvider>
    );

    const buttons = screen.getAllByTestId('button');
    const firstMatchButton = buttons[0];

    fireEvent.click(firstMatchButton);

    // Ensure that the function is called with the correct userId
    expect(handleAddToRecentChats).toHaveBeenCalledWith('1');
  });
});
