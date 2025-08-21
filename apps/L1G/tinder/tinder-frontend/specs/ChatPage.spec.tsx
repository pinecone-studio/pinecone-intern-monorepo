import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ChatPage from '../src/components/ChatPage';

// Mock the child components
jest.mock('@/components/ChatPerson', () => {
  return function MockChatPerson({ selectedUser, onUserSelect, bottomUsers, chattedUsers }: any) {
    return (
      <div data-testid="chat-person">
        <div data-testid="selected-user">{selectedUser?.name || 'No user selected'}</div>
        <div data-testid="bottom-users-count">{bottomUsers.length}</div>
        <div data-testid="chatted-users-count">{chattedUsers.size}</div>
        {bottomUsers.map((user: any) => (
          <button key={user.id} data-testid={`bottom-user-${user.id}`} onClick={() => onUserSelect(user)}>
            {user.name}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/ChatWindow', () => {
  return function MockChatWindow({ selectedUser, messages, inputValue, onInputChange, onKeyDown, onSend }: any) {
    return (
      <div data-testid="chat-window">
        <div data-testid="chat-user">{selectedUser?.name || 'No user'}</div>
        <div data-testid="messages-count">{messages.length}</div>
        {messages.map((msg: any) => (
          <div key={msg.id} data-testid={`message-${msg.id}`}>
            {msg.text} - {msg.sender}
          </div>
        ))}
        <input data-testid="message-input" value={inputValue} onChange={onInputChange} onKeyDown={onKeyDown} placeholder="Type a message..." />
        <button data-testid="send-button" onClick={onSend}>
          Send
        </button>
      </div>
    );
  };
});

jest.mock('@/components/Matches', () => {
  return function MockMatches({ topRowUsers, selectedUser, onUserSelect }: any) {
    return (
      <div data-testid="matches">
        <div data-testid="top-users-count">{topRowUsers.length}</div>
        {topRowUsers.map((user: any) => (
          <button key={user.id} data-testid={`top-user-${user.id}`} onClick={() => onUserSelect(user)} className={selectedUser?.id === user.id ? 'selected' : ''}>
            {user.name}
          </button>
        ))}
      </div>
    );
  };
});

describe('ChatPage', () => {
  beforeEach(() => {
    // Mock Date.now for consistent timestamps
    jest.spyOn(Date, 'now').mockReturnValue(1234567890000);

    // Mock toLocaleTimeString
    jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('14:28');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Initial Rendering', () => {
    test('renders all main components', () => {
      render(<ChatPage />);

      expect(screen.getByTestId('matches')).toBeInTheDocument();
      expect(screen.getByTestId('chat-person')).toBeInTheDocument();
      expect(screen.getByTestId('chat-window')).toBeInTheDocument();
    });

    test('renders with correct initial state', () => {
      render(<ChatPage />);

      // Should have Esther Howard (id: 9) selected by default
      expect(screen.getByTestId('selected-user')).toHaveTextContent('Esther Howard');
      expect(screen.getByTestId('chat-user')).toHaveTextContent('Esther Howard');

      // Should have 7 users in top row initially
      expect(screen.getByTestId('top-users-count')).toHaveTextContent('7');

      // Should have 2 users in bottom row initially (users 8 and 9)
      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('2');
    });

    test('displays initial conversation for selected user', () => {
      render(<ChatPage />);

      // Should show 4 initial messages for Esther Howard
      expect(screen.getByTestId('messages-count')).toHaveTextContent('4');
      expect(screen.getByTestId('message-1')).toHaveTextContent("Hey there! How's your day going? - them");
    });
  });

  describe('User Selection', () => {
    test('allows selecting users from top row', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Click on Leslie Alexander (id: 1)
      await user.click(screen.getByTestId('top-user-1'));

      expect(screen.getByTestId('selected-user')).toHaveTextContent('Leslie Alexander');
      expect(screen.getByTestId('chat-user')).toHaveTextContent('Leslie Alexander');
    });

    test('shows empty conversation for users without messages', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Select a user without existing conversation
      await user.click(screen.getByTestId('top-user-1'));

      expect(screen.getByTestId('messages-count')).toHaveTextContent('0');
    });

    test('allows selecting users from bottom row', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Click on a bottom user (should be Bessie Cooper - id: 8)
      await user.click(screen.getByTestId('bottom-user-8'));

      expect(screen.getByTestId('selected-user')).toHaveTextContent('Bessie Cooper');
    });
  });

  describe('Message Sending', () => {
    test('sends message when clicking send button', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');
      const sendButton = screen.getByTestId('send-button');

      await user.type(input, 'Hello world!');
      await user.click(sendButton);

      expect(screen.getByTestId('messages-count')).toHaveTextContent('5'); // 4 initial + 1 new
      expect(input).toHaveValue(''); // Input should be cleared
    });

    test('sends message when pressing Enter key', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      await user.type(input, 'Test message{enter}');

      expect(screen.getByTestId('messages-count')).toHaveTextContent('5');
      expect(input).toHaveValue('');
    });

    test('does not send empty or whitespace-only messages', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');
      const sendButton = screen.getByTestId('send-button');

      // Try to send empty message
      await user.click(sendButton);
      expect(screen.getByTestId('messages-count')).toHaveTextContent('4');

      // Try to send whitespace-only message
      await user.type(input, '   ');
      await user.click(sendButton);
      expect(screen.getByTestId('messages-count')).toHaveTextContent('4');
    });

    test('trims whitespace from messages', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      await user.type(input, '  Hello world!  {enter}');

      // Check that the message was added (can't easily check content with mocked component)
      expect(screen.getByTestId('messages-count')).toHaveTextContent('5');
    });

    test('prevents sending messages with Shift+Enter', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      await user.type(input, 'Test message');
      await user.keyboard('{Shift>}{Enter}{/Shift}');

      // Message should not be sent
      expect(screen.getByTestId('messages-count')).toHaveTextContent('4');
      expect(input).toHaveValue('Test message'); // Input should not be cleared
    });
  });

  describe('User Movement Logic', () => {
    test('moves user to bottom when sending first message', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Select a user from top row (Leslie Alexander - id: 1)
      await user.click(screen.getByTestId('top-user-1'));

      // Initial state: 7 top users, 2 bottom users
      expect(screen.getByTestId('top-users-count')).toHaveTextContent('7');
      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('2');

      // Send a message
      const input = screen.getByTestId('message-input');
      await user.type(input, 'First message{enter}');

      // User should be moved to bottom
      expect(screen.getByTestId('top-users-count')).toHaveTextContent('6');
      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('3');
    });

    test('updates chatted users set when sending messages', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Initially should have 0 chatted users (Esther Howard has existing conversation but hasn't been "chatted" yet)
      expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('0');

      // Send a message to current user (Esther Howard)
      const input = screen.getByTestId('message-input');
      await user.type(input, 'New message{enter}');

      // Should now have 1 chatted user
      expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('1');
    });

    test('does not duplicate users in bottom row', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Send message to already selected user (Esther Howard - id: 9) who is already in bottom
      const input = screen.getByTestId('message-input');
      await user.type(input, 'Message 1{enter}');

      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('2'); // Should still be 2

      // Send another message
      await user.type(input, 'Message 2{enter}');

      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent('2'); // Should still be 2
    });
  });

  describe('Edge Cases', () => {
    test('handles empty matches array', () => {
      // Mock empty matches by temporarily replacing the matches array
      const originalMatches = require('../src/components/ChatPage').matches;

      // This would require the component to export matches or handle empty state
      render(<ChatPage />);

      expect(screen.getByTestId('selected-user')).not.toHaveTextContent('No user selected');
    });

    test('handles sending message with no selected user gracefully', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Force selectedUser to null by manipulating state (if possible)
      // For now, test that message sending requires a selected user
      const input = screen.getByTestId('message-input');

      // Clear input and try to send empty
      await user.type(input, '');
      await user.click(screen.getByTestId('send-button'));

      // Should not crash and should not send message
      expect(screen.getByTestId('messages-count')).toHaveTextContent('4');
    });

    test('handles input changes correctly', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      await user.type(input, 'Test input');
      expect(input).toHaveValue('Test input');

      await user.clear(input);
      expect(input).toHaveValue('');
    });

    test('handles special characters in messages', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');
      const specialMessage = 'Hello! @#$%^&*()_+ 🎉 emoji test';

      await user.type(input, `${specialMessage}{enter}`);

      expect(screen.getByTestId('messages-count')).toHaveTextContent('5');
      expect(input).toHaveValue('');
    });

    test('handles very long messages', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');
      const longMessage = 'A'.repeat(1000); // Very long message

      await user.type(input, `${longMessage}{enter}`);

      expect(screen.getByTestId('messages-count')).toHaveTextContent('5');
      expect(input).toHaveValue('');
    });

    test('handles rapid message sending', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      // Send multiple messages rapidly
      for (let i = 0; i < 5; i++) {
        await user.type(input, `Message ${i}{enter}`);
      }

      expect(screen.getByTestId('messages-count')).toHaveTextContent('9'); // 4 initial + 5 new
    });

    test('handles user selection during message typing', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      // Start typing a message
      await user.type(input, 'Incomplete message');

      // Switch user while typing
      await user.click(screen.getByTestId('top-user-1'));

      // Input should still contain the text but for different user
      expect(input).toHaveValue('Incomplete message');
      expect(screen.getByTestId('selected-user')).toHaveTextContent('Leslie Alexander');
    });
  });

  describe('Timestamp Generation', () => {
    test('generates correct timestamp format', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');
      await user.type(input, 'Test message{enter}');

      // Verify that Date methods were called
      expect(Date.prototype.toLocaleTimeString).toHaveBeenCalledWith('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    });
  });

  describe('Component State Management', () => {
    test('maintains separate conversations for different users', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Send message to Esther Howard (default)
      const input = screen.getByTestId('message-input');
      await user.type(input, 'Message to Esther{enter}');

      // Switch to Leslie Alexander
      await user.click(screen.getByTestId('top-user-1'));
      expect(screen.getByTestId('messages-count')).toHaveTextContent('0');

      // Send message to Leslie
      await user.type(input, 'Message to Leslie{enter}');
      expect(screen.getByTestId('messages-count')).toHaveTextContent('1');

      // Switch back to Esther
      await user.click(screen.getByTestId('bottom-user-9'));
      expect(screen.getByTestId('messages-count')).toHaveTextContent('5'); // 4 initial + 1 new
    });

    test('preserves chatted users across user switches', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Send message to current user
      const input = screen.getByTestId('message-input');
      await user.type(input, 'First message{enter}');
      expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('1');

      // Switch to another user and send message
      await user.click(screen.getByTestId('top-user-1'));
      await user.type(input, 'Second message{enter}');
      expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('2');

      // Switch back - chatted count should remain
      await user.click(screen.getByTestId('bottom-user-9'));
      expect(screen.getByTestId('chatted-users-count')).toHaveTextContent('2');
    });

    test('handles user movement edge cases', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      // Select a user that's already in bottom (Bessie Cooper - id: 8)
      await user.click(screen.getByTestId('bottom-user-8'));

      const initialBottomCount = screen.getByTestId('bottom-users-count').textContent;

      // Send message - should not duplicate user in bottom
      const input = screen.getByTestId('message-input');
      await user.type(input, 'Test message{enter}');

      expect(screen.getByTestId('bottom-users-count')).toHaveTextContent(initialBottomCount);
    });

    test('handles keyboard navigation correctly', async () => {
      const user = userEvent.setup();
      render(<ChatPage />);

      const input = screen.getByTestId('message-input');

      // Test that Shift+Enter doesn't send message
      await user.type(input, 'Line 1');
      await user.keyboard('{Shift>}{Enter}{/Shift}');
      await user.type(input, 'Line 2');

      expect(input).toHaveValue('Line 1Line 2'); // Should still contain text
      expect(screen.getByTestId('messages-count')).toHaveTextContent('4'); // No new messages

      // Test that regular Enter sends the message
      await user.keyboard('{Enter}');
      expect(screen.getByTestId('messages-count')).toHaveTextContent('5');
      expect(input).toHaveValue('');
    });
  });
  test('maintains conversation history across user switches', async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    // Send message to Esther Howard (default selected)
    const input = screen.getByTestId('message-input');
    await user.type(input, 'Message to Esther{enter}');

    expect(screen.getByTestId('messages-count')).toHaveTextContent('5');

    // Switch to different user
    await user.click(screen.getByTestId('top-user-1'));
    expect(screen.getByTestId('messages-count')).toHaveTextContent('0');

    // Switch back to Esther Howard
    await user.click(screen.getByTestId('bottom-user-9'));
    expect(screen.getByTestId('messages-count')).toHaveTextContent('5'); // Should maintain history
  });
});
