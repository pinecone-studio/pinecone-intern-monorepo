import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the imported components before importing ChatWindow
jest.mock('../components/UnmatchButton', () => {
  return function UnmatchButton() {
    return <button data-testid="unmatch-button">Unmatch</button>;
  };
});

jest.mock('../components/ViewProfile', () => {
  return function ViewProfile({ user }) {
    return <button data-testid="view-profile-button">View Profile</button>;
  };
});

jest.mock('../components/Avatar', () => {
  return function Avatar({ user, size }) {
    return (
      <div data-testid="avatar" data-size={size}>
        {user.name}
      </div>
    );
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  MessageSquare: ({ size, className }) => <div data-testid="lucide-message-square" data-size={size} className={className} />,
  Send: ({ size }) => <div data-testid="lucide-send" data-size={size} />,
  MessageSquareDashedIcon: ({ size, color }) => <div data-testid="lucide-message-square-dashed" data-size={size} data-color={color} />,
}));

import ChatWindow from '../components/ChatWindow';

describe('ChatWindow', () => {
  const mockUser = {
    id: 1,
    name: 'John',
    age: 25,
    job: 'Software Engineer',
    avatar: ['avatar1.jpg'],
  };

  const mockMessages = [
    {
      id: 1,
      text: 'Hello there!',
      sender: 'them',
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      text: 'Hi! How are you?',
      sender: 'me',
      timestamp: '10:32 AM',
    },
  ];

  const defaultProps = {
    selectedUser: null,
    messages: [],
    inputValue: '',
    onInputChange: jest.fn(),
    onKeyDown: jest.fn(),
    onSend: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when no user is selected', () => {
    it('should display empty state message', () => {
      render(<ChatWindow {...defaultProps} />);

      expect(screen.getByText('Select a match to start chatting')).toBeInTheDocument();
      expect(screen.getByText('Choose someone from your matches to begin a conversation.')).toBeInTheDocument();
    });

    it('should display message square icon', () => {
      render(<ChatWindow {...defaultProps} />);

      const messageIcon = screen.getByTestId('lucide-message-square');
      expect(messageIcon).toBeInTheDocument();
    });
  });

  describe('when user is selected', () => {
    const propsWithUser = {
      ...defaultProps,
      selectedUser: mockUser,
    };

    it('should display user information in header', () => {
      render(<ChatWindow {...propsWithUser} />);

      expect(screen.getByText('John, 25')).toBeInTheDocument();
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    it('should display avatar with correct props', () => {
      render(<ChatWindow {...propsWithUser} />);

      const avatar = screen.getByTestId('avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-size', '48');
      expect(avatar).toHaveTextContent('John');
    });

    it('should display view profile and unmatch buttons', () => {
      render(<ChatWindow {...propsWithUser} />);

      expect(screen.getByTestId('view-profile-button')).toBeInTheDocument();
      expect(screen.getByTestId('unmatch-button')).toBeInTheDocument();
    });

    it('should have correct dimensions', () => {
      const { container } = render(<ChatWindow {...propsWithUser} />);

      const chatWindow = container.firstChild;
      expect(chatWindow).toHaveClass('w-[980px]', 'h-[930px]');
    });

    describe('when no messages exist', () => {
      it('should display empty chat state', () => {
        render(<ChatWindow {...propsWithUser} />);

        expect(screen.getByText('Say Hi!')).toBeInTheDocument();
        expect(screen.getByText("You've got a match! Send a message to start chatting.")).toBeInTheDocument();
      });
    });

    describe('when messages exist', () => {
      const propsWithMessages = {
        ...propsWithUser,
        messages: mockMessages,
      };

      it('should display all messages', () => {
        render(<ChatWindow {...propsWithMessages} />);

        expect(screen.getByText('Hello there!')).toBeInTheDocument();
        expect(screen.getByText('Hi! How are you?')).toBeInTheDocument();
      });

      it('should display message timestamps', () => {
        render(<ChatWindow {...propsWithMessages} />);

        expect(screen.getByText('10:30 AM')).toBeInTheDocument();
        expect(screen.getByText('10:32 AM')).toBeInTheDocument();
      });

      it('should apply correct styling to sender messages', () => {
        render(<ChatWindow {...propsWithMessages} />);

        const myMessage = screen.getByText('Hi! How are you?').closest('div');
        expect(myMessage).toHaveClass('bg-gradient-to-r', 'from-pink-500', 'to-red-500', 'text-white');
      });

      it('should apply correct styling to received messages', () => {
        render(<ChatWindow {...propsWithMessages} />);

        const theirMessage = screen.getByText('Hello there!').closest('div');
        expect(theirMessage).toHaveClass('bg-white', 'text-gray-900', 'shadow-sm');
      });

      it('should align messages correctly', () => {
        const { container } = render(<ChatWindow {...propsWithMessages} />);

        const messageContainers = container.querySelectorAll('.flex.justify-end, .flex.justify-start');

        // First message is from 'them' - should be left aligned
        expect(messageContainers[0]).toHaveClass('justify-start');

        // Second message is from 'me' - should be right aligned
        expect(messageContainers[1]).toHaveClass('justify-end');
      });
    });

    describe('input functionality', () => {
      it('should display input field with correct placeholder', () => {
        render(<ChatWindow {...propsWithUser} />);

        const input = screen.getByPlaceholderText('Say something nice');
        expect(input).toBeInTheDocument();
      });

      it('should display current input value', () => {
        const propsWithInput = {
          ...propsWithUser,
          inputValue: 'Test message',
        };

        render(<ChatWindow {...propsWithInput} />);

        const input = screen.getByDisplayValue('Test message');
        expect(input).toBeInTheDocument();
      });

      it('should call onInputChange when typing', () => {
        const mockOnInputChange = jest.fn();
        const propsWithHandler = {
          ...propsWithUser,
          onInputChange: mockOnInputChange,
        };

        render(<ChatWindow {...propsWithHandler} />);

        const input = screen.getByPlaceholderText('Say something nice');
        fireEvent.change(input, { target: { value: 'Hello' } });

        expect(mockOnInputChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: 'Hello' }),
          })
        );
      });

      it('should call onKeyDown when key is pressed', () => {
        const mockOnKeyDown = jest.fn();
        const propsWithHandler = {
          ...propsWithUser,
          onKeyDown: mockOnKeyDown,
        };

        render(<ChatWindow {...propsWithHandler} />);

        const input = screen.getByPlaceholderText('Say something nice');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockOnKeyDown).toHaveBeenCalled();
      });
    });

    describe('send button', () => {
      it('should display send button', () => {
        render(<ChatWindow {...propsWithUser} />);

        expect(screen.getByText('Send')).toBeInTheDocument();
      });

      it('should be disabled when input is empty', () => {
        render(<ChatWindow {...propsWithUser} />);

        const sendButton = screen.getByText('Send');
        expect(sendButton).toBeDisabled();
      });

      it('should be disabled when input contains only whitespace', () => {
        const propsWithWhitespace = {
          ...propsWithUser,
          inputValue: '   ',
        };

        render(<ChatWindow {...propsWithWhitespace} />);

        const sendButton = screen.getByText('Send');
        expect(sendButton).toBeDisabled();
      });

      it('should be enabled when input has content', () => {
        const propsWithContent = {
          ...propsWithUser,
          inputValue: 'Hello',
        };

        render(<ChatWindow {...propsWithContent} />);

        const sendButton = screen.getByText('Send');
        expect(sendButton).toBeEnabled();
      });

      it('should call onSend when clicked', () => {
        const mockOnSend = jest.fn();
        const propsWithHandler = {
          ...propsWithUser,
          inputValue: 'Test message',
          onSend: mockOnSend,
        };

        render(<ChatWindow {...propsWithHandler} />);

        const sendButton = screen.getByText('Send');
        fireEvent.click(sendButton);

        expect(mockOnSend).toHaveBeenCalled();
      });

  it('calls onInputChange when typing in input', () => {
    render(<ChatWindow {...defaultProps} />);
    const input = screen.getByPlaceholderText(/say something nice/i);
    fireEvent.change(input, { target: { value: 'New message' } });
    expect(mockOnInputChange).toHaveBeenCalled();
  });

  it('calls onKeyDown when key pressed in input', () => {
    render(<ChatWindow {...defaultProps} />);
    const input = screen.getByPlaceholderText(/say something nice/i);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it('displays multiple messages correctly', () => {
    const multipleMessages = [
      { id: 1, text: 'Hello!', sender: 'them' as const, timestamp: '10:30' },
      { id: 2, text: 'Hi there!', sender: 'me' as const, timestamp: '10:31' },
      { id: 3, text: 'How are you?', sender: 'them' as const, timestamp: '10:32' },
    ];

    render(<ChatWindow {...defaultProps} messages={multipleMessages} />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });
});
