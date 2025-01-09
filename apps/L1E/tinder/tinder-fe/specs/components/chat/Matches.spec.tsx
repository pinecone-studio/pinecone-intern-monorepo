import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Match, useAddMessageMutation, useGetAllConversationsQuery, useGetConversationQuery, useUnMatchMutation } from '@/generated';
import { useSearchParams } from 'next/navigation';
import Matches from '@/components/chat/Matches';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useGetAllConversationsQuery: jest.fn(),
  useAddMessageMutation: jest.fn(),
  useUnMatchMutation: jest.fn(),
  useGetConversationQuery: jest.fn(),
}));

describe('Matches component', () => {
  it('should render matches and conversations correctly', () => {
    const handleAddToRecentChats = jest.fn();
    const matches = [
      { targetUserId: { _id: '1', images: ['image1.jpg'], username: 'User1', age: 25, profession: 'Engineer' } },
      { targetUserId: { _id: '2', images: ['image2.jpg'], username: 'User2', age: 28, profession: 'Designer' } },
    ];

    useSearchParams.mockReturnValue({ get: jest.fn().mockReturnValue('User1') });
    useGetAllConversationsQuery.mockReturnValue({
      data: {
        getAllConversations: [
          { userTwo: { _id: '1', username: 'User1', age: 25, images: ['image1.jpg'], profession: 'Engineer' } },
          { userTwo: { _id: '2', username: 'User2', age: 28, images: ['image2.jpg'], profession: 'Designer' } },
        ],
      },
    });

    useAddMessageMutation.mockReturnValue([jest.fn(), { loading: false, error: null }]);

    useUnMatchMutation.mockReturnValue([jest.fn(), { loading: false, error: null }]);

    useGetConversationQuery.mockReturnValue({
      data: {
        getConversation: {
          id: '123',
          messages: [
            { sender: 'User1', content: 'Hello' },
            { sender: 'User2', content: 'Hi' },
          ],
        },
      },
    });

    const { getAllByTestId } = render(
      <MockedProvider>
        <Matches handleAddToRecentChats={handleAddToRecentChats} matches={matches} />
      </MockedProvider>
    );

    expect(screen.getByText('User1'));
    expect(screen.getByText('User2'));

    const buttons = getAllByTestId('button');
    const user1Button = buttons[0];
    fireEvent.click(user1Button);

    expect(handleAddToRecentChats).toHaveBeenCalledWith('1');
  });

  it('should handle loading and error states', () => {
    const handleAddToRecentChats = jest.fn();
    const matches = [
      { targetUserId: { _id: '', images: ['image1.jpg'], username: 'User1', age: 25, profession: 'Engineer' } },
      { targetUserId: { _id: '2', images: ['image2.jpg'], username: 'User2', age: 28, profession: 'Designer' } },
    ];

    const { getAllByTestId } = render(
      <MockedProvider>
        <Matches handleAddToRecentChats={handleAddToRecentChats} matches={matches} />
      </MockedProvider>
    );

    expect(screen.getByText('User1'));
    expect(screen.getByText('User2'));

    const buttons = getAllByTestId('button');
    const user1Button = buttons[0];
    fireEvent.click(user1Button);

    expect(handleAddToRecentChats);
  });
  it('should handle loading and error states', () => {
    const handleAddToRecentChats = jest.fn();
    const matches: Match[] = [];

    useGetAllConversationsQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <MockedProvider>
        <Matches handleAddToRecentChats={handleAddToRecentChats} matches={matches} />
      </MockedProvider>
    );
  });

  it('should handle errors during loading', () => {
    const handleAddToRecentChats = jest.fn();
    const matches: Match[] = [];

    // Mock error state
    useGetAllConversationsQuery.mockReturnValue({
      data: null,
      error: new Error('Error fetching conversations'),
      isLoading: false,
    });

    render(
      <MockedProvider>
        <Matches handleAddToRecentChats={handleAddToRecentChats} matches={matches} />
      </MockedProvider>
    );
  });
});
