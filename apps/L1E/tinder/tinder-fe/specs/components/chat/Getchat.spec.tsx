import { render, screen, waitFor } from '@testing-library/react';

import GetChat from '@/components/chat/GetChat';
import * as generatedHooks from '@/generated';

jest.mock('@/generated', () => ({
  useGetConversationQuery: jest.fn(),
}));

describe('GetChat', () => {
  it('should render messages when there are messages in the conversation', async () => {
    const mockConversationData = {
      getConversation: {
        messages: [
          { id: '1', sender: 'user1', text: 'Hello!' },
          { id: '2', sender: 'user2', text: 'How are you?' },
        ],
      },
    };

    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: mockConversationData,
      loading: false,
      error: null,
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);

    await waitFor(() => screen.getByText('Hello!'));
  });

  it('should render loading state when data is loading', async () => {
    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);

    expect(screen.getByText('No conversation data available.'));
  });

  it('should render error state when there is an error', async () => {
    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch data'),
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);

    expect(screen.getByText('No conversation data available.'));
  });
});
