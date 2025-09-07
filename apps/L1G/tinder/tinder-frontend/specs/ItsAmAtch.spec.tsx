/* eslint-disable max-lines */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { SendMessageDocument, SendMessageMutation, SendMessageMutationVariables } from '@/generated';
import { MatchedUser } from '@/app/(main)/home/page';
import MatchPopup from '@/components/ItsAmAtch';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock socket
jest.mock('utils/socket', () => ({
  socket: {
    connected: true,
    connect: jest.fn(),
    emit: jest.fn(),
  },
}));

// Create a mock function that can be changed per test
const mockUseCurrentUser = jest.fn();

// Mock useCurrentUser with the changeable function
jest.mock('@/app/contexts/CurrentUserContext', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
  CurrentUserProvider: ({ children }: any) => <div>{children}</div>,
}));

const mockMatchedUsers: MatchedUser[] = [
  {
    id: 'user1',
    name: 'User One',
    images: ['/path/to/image1.jpg'],
  },
  {
    id: 'user2',
    name: 'User Two',
    images: ['/path/to/image2.jpg'],
  },
];

const mockData = {
  getMe: {
    id: 'current-user-id',
    name: 'Current User',
  },
};

const sendMessageMock: MockedResponse<SendMessageMutation> = {
  request: {
    query: SendMessageDocument,
    variables: {
      senderId: 'current-user-id',
      receiverId: 'user2',
      matchId: 'match-123',
      content: 'Hello there!',
    } as SendMessageMutationVariables,
  },
  result: {
    data: {
      sendMessage: {
        id: 'message-123',
        content: 'Hello there!',
        senderId: 'current-user-id',
        receiverId: 'user2',
        matchId: 'match-123',
        timestamp: '2023-01-01T00:00:00Z',
        seen: false,
      },
    },
  },
};

const sendMessageErrorMock: MockedResponse<SendMessageMutation> = {
  request: {
    query: SendMessageDocument,
    variables: {
      senderId: 'current-user-id',
      receiverId: 'user2',
      matchId: 'match-123',
      content: 'Hello there!',
    } as SendMessageMutationVariables,
  },
  error: new Error('Failed to send message'),
};

describe('MatchPopup Component', () => {
  const defaultProps = {
    onClose: jest.fn(),
    matchedUsers: mockMatchedUsers,
    data: mockData,
    setConversations: jest.fn(),
    setChattedUsers: jest.fn(),
    refetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    // Set default mock implementation
    mockUseCurrentUser.mockReturnValue({
      currentUser: {
        id: 'current-user-id',
        name: 'Current User',
        images: ['/current-user-image.jpg'],
        matchIds: [
          {
            id: 'match-123',
            matchedUser: {
              id: 'user2',
              name: 'User Two',
            },
          },
        ],
      },
    });
  });

  it('renders match popup with user information', () => {
    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} />
      </MockedProvider>
    );

    expect(screen.getByText("It's a Match")).toBeInTheDocument();
    expect(screen.getByText('You matched with User Two')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Say something nice')).toBeInTheDocument();
    expect(screen.getByTestId('Send')).toBeInTheDocument();
  });

  it('renders user profile images', () => {
    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} />
      </MockedProvider>
    );

    const images = screen.getAllByRole('img');
    const profileImages = images.filter((img) => img.getAttribute('alt')?.includes('profile'));

    expect(profileImages).toHaveLength(2);
    expect(profileImages[0]).toHaveAttribute('src', '/path/to/image1.jpg');
    expect(profileImages[0]).toHaveAttribute('alt', 'Your profile');
    expect(profileImages[1]).toHaveAttribute('src', '/path/to/image2.jpg');
    expect(profileImages[1]).toHaveAttribute('alt', "User Two's profile");
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} onClose={onCloseMock} />
      </MockedProvider>
    );

    const closeButton = screen.getByLabelText('Close icon');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('enables send button only when input has text', () => {
    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Initially disabled
    expect(sendButton).toBeDisabled();

    // Type something
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    expect(sendButton).not.toBeDisabled();

    // Clear input
    fireEvent.change(input, { target: { value: '' } });
    expect(sendButton).toBeDisabled();
  });

  it('sends message when send button is clicked', async () => {
    const setConversationsMock = jest.fn();
    const setChattedUsersMock = jest.fn();

    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} setConversations={setConversationsMock} setChattedUsers={setChattedUsersMock} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message
    fireEvent.change(input, { target: { value: 'Hello there!' } });

    // Click send
    fireEvent.click(sendButton);

    // Check if optimistic update was called
    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalled();
      expect(setChattedUsersMock).toHaveBeenCalled();
    });

    // Check if input is cleared after successful send
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('sends message when Enter key is pressed', async () => {
    const setConversationsMock = jest.fn();

    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} setConversations={setConversationsMock} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');

    // Type message
    fireEvent.change(input, { target: { value: 'Hello there!' } });

    // Press Enter
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalled();
    });
  });

  it('does not send message when Shift+Enter is pressed', () => {
    const setConversationsMock = jest.fn();

    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} setConversations={setConversationsMock} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');

    // Type message
    fireEvent.change(input, { target: { value: 'Hello there!' } });

    // Press Shift+Enter
    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
      shiftKey: true,
    });

    expect(setConversationsMock).not.toHaveBeenCalled();
  });

  it('shows error message when send fails', async () => {
    render(
      <MockedProvider mocks={[sendMessageErrorMock]} addTypename={false}>
        <MatchPopup {...defaultProps} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message and send
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    fireEvent.click(sendButton);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/)).toBeInTheDocument();
    });
  });

  it('shows sending state when message is being sent', async () => {
    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message and send
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    fireEvent.click(sendButton);

    // Should show sending state briefly
    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(sendButton).toBeDisabled();
  });

  it('does not render when matchedUsers is invalid', () => {
    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} matchedUsers={[]} />
      </MockedProvider>
    );

    expect(screen.queryByText("It's a Match")).not.toBeInTheDocument();
  });

  it('does not render when matchedUsers has less than 2 users', () => {
    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} matchedUsers={[mockMatchedUsers[0]]} />
      </MockedProvider>
    );

    expect(screen.queryByText("It's a Match")).not.toBeInTheDocument();
  });

  it('closes popup after successful message send', async () => {
    const onCloseMock = jest.fn();

    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} onClose={onCloseMock} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message and send
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    fireEvent.click(sendButton);

    // Wait for popup to close (after 1 second timeout)
    await waitFor(
      () => {
        expect(onCloseMock).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });

  it('shows error when receiver ID is not found (lines 66-69)', async () => {
    // Mock current user without matchIds to trigger receiver ID not found
    mockUseCurrentUser.mockReturnValue({
      currentUser: {
        id: 'current-user-id',
        name: 'Current User',
        images: ['/current-user-image.jpg'],
        matchIds: [],
      },
    });

    render(
      <MockedProvider mocks={[sendMessageMock]} addTypename={false}>
        <MatchPopup {...defaultProps} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message and send
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    fireEvent.click(sendButton);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/Recipient not found. Please try again./)).toBeInTheDocument();
    });
  });
  it('handles backend not returning message ID (line 173)', async () => {
    const noMessageIdMock: MockedResponse<SendMessageMutation> = {
      request: {
        query: SendMessageDocument,
        variables: {
          senderId: 'current-user-id',
          receiverId: 'user2',
          matchId: 'match-123',
          content: 'Hello there!',
        } as SendMessageMutationVariables,
      },
      result: {
        data: {
          sendMessage: {
            id: '', // Empty ID to trigger error
            content: 'Hello there!',
            senderId: 'current-user-id',
            receiverId: 'user2',
            matchId: 'match-123',
            timestamp: '2023-01-01T00:00:00Z',
            seen: false,
          },
        },
      },
    };

    const setConversationsMock = jest.fn();

    render(
      <MockedProvider mocks={[noMessageIdMock]} addTypename={false}>
        <MatchPopup {...defaultProps} setConversations={setConversationsMock} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message and send
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    fireEvent.click(sendButton);

    // Should update conversation with failed message
    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalledWith(expect.any(Function));
    });

    // Should show error
    await waitFor(() => {
      expect(screen.getByText(/Failed to send message: No message ID returned from backend/)).toBeInTheDocument();
    });
  });

  it('updates failed message in conversation on error (lines 182, 122)', async () => {
    const setConversationsMock = jest.fn();

    render(
      <MockedProvider mocks={[sendMessageErrorMock]} addTypename={false}>
        <MatchPopup {...defaultProps} setConversations={setConversationsMock} />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Say something nice');
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Type message and send
    fireEvent.change(input, { target: { value: 'Hello there!' } });
    fireEvent.click(sendButton);

    // Should call setConversations twice - once for optimistic update, once for error update
    await waitFor(() => {
      expect(setConversationsMock).toHaveBeenCalledTimes(2);
    });

    // Get the optimistic update call to see what temp ID was used
    const optimisticUpdateCall = setConversationsMock.mock.calls[0][0];
    const initialState = { user2: [] };
    const stateAfterOptimistic = optimisticUpdateCall(initialState);
    const tempId = stateAfterOptimistic.user2[0].id;

    // Now simulate the error update call with the correct temp ID
    const errorUpdateCall = setConversationsMock.mock.calls[1][0];
    const mockPreviousState = {
      user2: [
        {
          id: tempId, // Use the actual temp ID that was generated
          text: 'Hello there!',
          sender: 'me',
          timestamp: stateAfterOptimistic.user2[0].timestamp,
          seen: false,
          delivered: false,
          sending: true,
          failed: false,
          retrying: false,
        },
      ],
    };

    const updatedState = errorUpdateCall(mockPreviousState);

    // Verify the message was updated correctly
    const updatedMessage = updatedState.user2[0];
    expect(updatedMessage.failed).toBe(true);
    expect(updatedMessage.sending).toBe(false);
    expect(updatedMessage.delivered).toBe(false);
  });
});
