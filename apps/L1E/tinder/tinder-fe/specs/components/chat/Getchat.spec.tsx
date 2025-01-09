import GetChat from '@/components/chat/GetChat';

import { render } from '@testing-library/react';

import * as generatedHooks from '@/generated';

jest.mock('@/generated', () => ({
  useGetConversationQuery: jest.fn(),
}));

describe('GetChat', () => {
  it('should render a message when there are no messages in the conversation', async () => {
    const mockConversationData = {
      getConversation: {
        messages: [],
      },
    };

    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: mockConversationData,
      loading: false,
      error: null,
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);
  });

  it('should render messages when there are messages in the conversation', async () => {
    const mockConversationData = {
      getConversation: {
        messages: [
          { id: '1', text: 'Hello!' },
          { id: '2', text: 'How are you?' },
        ],
      },
    };

    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: mockConversationData,
      loading: false,
      error: null,
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);
  });

  it('should render loading state when data is loading', async () => {
    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);
  });

  it('should render error state when there is an error', async () => {
    (generatedHooks.useGetConversationQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to fetch data'),
    });

    render(<GetChat sender="user1" chosenUserId="user2" />);
  });
});
