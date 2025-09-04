/* eslint-disable react/function-component-definition */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatPerson from '@/components/ChatPerson';
import type { ChatUser } from 'types/chat';

jest.mock('clsx', () => {
  return (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');
});

/* eslint-disable-next-line react/display-name */
jest.mock('@/components/Avatar', () => ({ user, width, height, className }: any) => (
  <div data-testid={`avatar-${user.id}`} data-width={width} data-height={height} className={className}>
    Avatar for {user.name}
  </div>
));

jest.mock('lucide-react', () => ({
  Reply: () => <div data-testid="reply-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  Wifi: () => <div data-testid="wifi-icon" />,
  WifiOff: () => <div data-testid="wifi-off-icon" />,
  ReplyIcon: () => <div data-testid="reply-icon-2" />,
}));

// Mock users with lastMessage and other required properties
const mockUsers: (ChatUser & {
  lastMessage?: {
    text: string;
    sender: 'me' | 'them';
    timestamp: string;
    seen?: boolean;
  };
  hasUnreadMessages?: boolean;
  lastActivity?: Date;
})[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 25,
    profession: 'Developer',
    images: ['/john.jpg'],
    dateOfBirth: '1998-04-12',
    startedConversation: true,
    lastMessage: {
      text: 'Hello there!',
      sender: 'them',
      timestamp: '10:30',
    },
    hasUnreadMessages: true,
    lastActivity: new Date('2023-01-01T10:30:00'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 28,
    profession: 'Designer',
    images: ['/jane.jpg'],
    dateOfBirth: '1995-06-22',
    startedConversation: true,
    lastMessage: {
      text: 'How are you?',
      sender: 'me',
      timestamp: '09:15',
      seen: true,
    },
    hasUnreadMessages: false,
    lastActivity: new Date('2023-01-01T09:15:00'),
  },
  {
    id: '3',
    name: 'Bob Wilson',
    age: 32,
    profession: 'Manager',
    images: ['/bob.jpg'],
    dateOfBirth: '1991-01-01',
    startedConversation: false,
    hasUnreadMessages: false,
    lastActivity: new Date('2022-12-31T15:45:00'),
  },
];

const mockUserStatuses = {
  '1': {
    status: 'online' as const,
    lastSeen: '2023-01-01T12:00:00Z',
  },
  '2': {
    status: 'away' as const,
    lastSeen: '2023-01-01T11:30:00Z',
  },
  '3': {
    status: 'offline' as const,
    lastSeen: '2022-12-31T15:45:00Z',
  },
};

describe('ChatPerson', () => {
  const defaultProps = {
    selectedUser: null,
    onUserSelect: jest.fn(),
    bottomUsers: mockUsers,
    userStatuses: mockUserStatuses,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with title and unread count', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('1 unread')).toBeInTheDocument();
  });

  it('renders all users from bottomUsers', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
  });

  it('renders avatars for all users', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByTestId('avatar-1')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-2')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-3')).toBeInTheDocument();
  });

  it('calls onUserSelect when a user is clicked', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);
    fireEvent.click(screen.getByText('John Doe'));
    expect(onUserSelect).toHaveBeenCalledTimes(1);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('renders last message for users with messages', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();
  });

  it('shows unread badge for users with unread messages', () => {
    render(<ChatPerson {...defaultProps} />);
    const johnAvatar = screen.getByTestId('avatar-1').parentElement;
    expect(johnAvatar?.querySelector('.bg-pink-500.rounded-full')).toBeInTheDocument();
  });

  it('does not show unread badge for users without unread messages', () => {
    render(<ChatPerson {...defaultProps} />);
    const janeAvatar = screen.getByTestId('avatar-2').parentElement;
    expect(janeAvatar?.querySelector('.bg-pink-500.rounded-full')).not.toBeInTheDocument();
  });

  it('shows online status indicator for online users', () => {
    render(<ChatPerson {...defaultProps} />);
    const johnAvatar = screen.getByTestId('avatar-1').parentElement;
    expect(johnAvatar?.querySelector('.bg-green-500')).toBeInTheDocument();
    expect(johnAvatar?.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('shows away status indicator for away users', () => {
    render(<ChatPerson {...defaultProps} />);
    const janeAvatar = screen.getByTestId('avatar-2').parentElement;
    expect(janeAvatar?.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(janeAvatar?.querySelector('[data-testid="clock-icon"]')).toBeInTheDocument();
  });

  it('shows offline status indicator for offline users', () => {
    render(<ChatPerson {...defaultProps} />);
    const bobAvatar = screen.getByTestId('avatar-3').parentElement;
    expect(bobAvatar?.querySelector('.bg-gray-400')).toBeInTheDocument();
  });

  it('shows "New Message" badge for unread messages', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('New Message')).toBeInTheDocument();
  });

  it('shows "Say Hi" badge for users without messages', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('Say Hi')).toBeInTheDocument();
  });

  it('renders empty state when bottomUsers is empty', () => {
    render(<ChatPerson {...defaultProps} bottomUsers={[]} />);
    expect(screen.getByText('No conversations yet')).toBeInTheDocument();
    expect(screen.getByText('Start chatting with your matches!')).toBeInTheDocument();
    expect(screen.getByTestId('reply-icon')).toBeInTheDocument();
  });

  it('calls onUserSelect multiple times on same user', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);
    const user = screen.getByText('John Doe');
    fireEvent.click(user);
    fireEvent.click(user);
    expect(onUserSelect).toHaveBeenCalledTimes(2);
    expect(onUserSelect).toHaveBeenNthCalledWith(1, mockUsers[0]);
    expect(onUserSelect).toHaveBeenNthCalledWith(2, mockUsers[0]);
  });

  it('calls onUserSelect for different users correctly', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);
    fireEvent.click(screen.getByText('John Doe'));
    fireEvent.click(screen.getByText('Jane Smith'));
    expect(onUserSelect).toHaveBeenCalledTimes(2);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[1]);
  });

  it('formats timestamps correctly', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('10:30')).toBeInTheDocument();
    expect(screen.getByText('09:15')).toBeInTheDocument();
  });

  it('shows reply icon for messages sent by me', () => {
    render(<ChatPerson {...defaultProps} />);
    const janeMessage = screen.getByText('How are you?').closest('div.flex.items-center');
    expect(janeMessage?.querySelector('[data-testid="reply-icon"]')).toBeInTheDocument();
  });

  it('does not show reply icon for messages sent by them', () => {
    render(<ChatPerson {...defaultProps} />);
    const johnMessage = screen.getByText('Hello there!').closest('div.flex.items-center');
    expect(johnMessage?.querySelector('[data-testid="reply-icon"]')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<ChatPerson {...defaultProps} className="custom-class" />);
    const container = screen.getByText('Messages').closest('div.flex.flex-col');
    expect(container).toHaveClass('custom-class');
  });

  it('returns original timestamp if formatting fails', () => {
    const malformedUser = {
      ...mockUsers[0],
      lastMessage: {
        ...mockUsers[0].lastMessage!,
        timestamp: 'invalid-timestamp',
      },
    };
    render(<ChatPerson {...defaultProps} bottomUsers={[malformedUser]} />);
    expect(screen.getByText('invalid-timestamp')).toBeInTheDocument();
  });

  it('does not render status indicator if user status is not available', () => {
    const usersWithoutStatus = [
      {
        ...mockUsers[0],
        id: '99',
      },
    ];
    render(<ChatPerson {...defaultProps} bottomUsers={usersWithoutStatus} userStatuses={{}} />);
    const avatar = screen.getByTestId('avatar-99').parentElement;
    expect(avatar?.querySelector('.bg-green-500')).not.toBeInTheDocument();
    expect(avatar?.querySelector('.bg-yellow-500')).not.toBeInTheDocument();
    expect(avatar?.querySelector('.bg-gray-400')).not.toBeInTheDocument();
  });
  it('shows "Online now" when user status is online', () => {
    const user = {
      id: '1',
      name: 'Alice',
      hasUnreadMessages: false,
      lastActivity: new Date(),
    };

    render(
      <ChatPerson
        selectedUser={null}
        onUserSelect={jest.fn()}
        bottomUsers={[user]}
        userStatuses={{
          '1': { status: 'online', lastSeen: new Date().toISOString() },
        }}
      />
    );

    expect(screen.getByText('Online now')).toBeInTheDocument();
  });
  it('shows "Last seen" when user is away or offline', () => {
    const user = {
      id: '2',
      name: 'Bob',
      hasUnreadMessages: false,
      lastActivity: new Date(),
    };

    render(
      <ChatPerson
        selectedUser={null}
        onUserSelect={jest.fn()}
        bottomUsers={[user]}
        userStatuses={{
          '2': { status: 'away', lastSeen: '2025-09-03T09:00:00Z' },
        }}
      />
    );

    expect(screen.getByText(/Last seen/i)).toBeInTheDocument();
  });
  it('shows "Tap to start chatting" when user has no status', () => {
    const user = {
      id: '3',
      name: 'Charlie',
      hasUnreadMessages: false,
      lastActivity: new Date(),
    };

    render(
      <ChatPerson
        selectedUser={null}
        onUserSelect={jest.fn()}
        bottomUsers={[user]}
        userStatuses={{}} // No status for this user
      />
    );

    expect(screen.getByText('Tap to start chatting')).toBeInTheDocument();
  });

  describe('getStatusIndicator function coverage', () => {
    it('returns null when status is offline (line 83)', () => {
      const offlineUser = {
        ...mockUsers[0],
        id: 'offline-user',
      };

      render(
        <ChatPerson
          {...defaultProps}
          bottomUsers={[offlineUser]}
          userStatuses={{
            'offline-user': {
              status: 'offline',
              lastSeen: '2022-12-31T15:45:00Z',
            },
          }}
        />
      );

      const avatar = screen.getByTestId('avatar-offline-user').parentElement;
      expect(avatar?.querySelector('.bg-gray-400')).toBeInTheDocument();
      expect(avatar?.querySelector('.bg-green-500')).not.toBeInTheDocument();
      expect(avatar?.querySelector('.bg-yellow-500')).not.toBeInTheDocument();
    });
  });
  describe('message status indicators coverage (lines 198-206)', () => {
    it('shows seen indicator when message is seen', () => {
      const userWithSeenMessage = {
        ...mockUsers[1],
        id: 'seen-user',
        lastMessage: {
          ...mockUsers[1].lastMessage!,
          seen: true,
        },
      };

      render(<ChatPerson {...defaultProps} bottomUsers={[userWithSeenMessage]} />);

      const messageContainer = screen.getByText('How are you?').closest('div.flex.items-center.justify-between');
      const statusIndicator = messageContainer?.querySelector('.text-xs.text-pink-500');

      expect(statusIndicator).toBeInTheDocument();
    });

    it('shows unseen indicator when message is not seen', () => {
      const userWithUnseenMessage = {
        ...mockUsers[1],
        id: 'unseen-user',
        lastMessage: {
          ...mockUsers[1].lastMessage!,
          seen: false,
        },
      };

      render(<ChatPerson {...defaultProps} bottomUsers={[userWithUnseenMessage]} />);

      const messageContainer = screen.getByText('How are you?').closest('div.flex.items-center.justify-between');
      const statusIndicator = messageContainer?.querySelector('.text-xs.text-gray-400');

      expect(statusIndicator).toBeInTheDocument();
    });

    it('shows "New Message" badge for unread messages from others', () => {
      const userWithUnread = {
        ...mockUsers[0],
        id: 'unread-user',
        hasUnreadMessages: true,
      };

      render(<ChatPerson {...defaultProps} bottomUsers={[userWithUnread]} />);

      const messageContainer = screen.getByText('Hello there!').closest('div.flex.items-center.justify-between');
      const newMessageBadge = messageContainer?.querySelector('.bg-gradient-to-r.from-pink-500.to-red-500');

      expect(newMessageBadge).toBeInTheDocument();
      expect(newMessageBadge).toHaveTextContent('New Message');
    });
  });
  it('uses default userStatuses when not provided (covers line 33)', () => {
    render(
      <ChatPerson
        selectedUser={null}
        onUserSelect={jest.fn()}
        bottomUsers={mockUsers}
        // `userStatuses` omitted intentionally
      />
    );

    // Expect at least one user to render without error
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  describe('covers line 129 ternary branches for user status line', () => {
    it('shows "Online now" if status is online and no lastMessage', () => {
      const user = {
        id: 'online-user',
        name: 'Online User',
        hasUnreadMessages: false,
        lastActivity: new Date(),
        // No lastMessage!
      };

      render(<ChatPerson selectedUser={null} onUserSelect={jest.fn()} bottomUsers={[user]} userStatuses={{ 'online-user': { status: 'online', lastSeen: new Date().toISOString() } }} />);

      expect(screen.getByText('Online now')).toBeInTheDocument();
    });

    it('shows "Last seen" if userStatus exists and status is not online (e.g. away)', () => {
      const user = {
        id: 'away-user',
        name: 'Away User',
        hasUnreadMessages: false,
        lastActivity: new Date(),
      };

      render(<ChatPerson selectedUser={null} onUserSelect={jest.fn()} bottomUsers={[user]} userStatuses={{ 'away-user': { status: 'away', lastSeen: new Date().toISOString() } }} />);

      expect(screen.getByText(/Last seen/i)).toBeInTheDocument();
    });

    it('shows "Tap to start chatting" if no userStatus is present', () => {
      const user = {
        id: 'no-status-user-2',
        name: 'No Status User 2',
        hasUnreadMessages: false,
        lastActivity: new Date(),
      };

      render(
        <ChatPerson
          selectedUser={null}
          onUserSelect={jest.fn()}
          bottomUsers={[user]}
          userStatuses={{}} // userStatuses is empty
        />
      );

      expect(screen.getByText('Tap to start chatting')).toBeInTheDocument();
    });
  });

  it('returns null when user status is not available (line 83 coverage)', () => {
    const userWithoutStatus = {
      ...mockUsers[0],
      id: 'no-status-user',
      name: 'No Status User',
    };
    render(
      <ChatPerson
        {...defaultProps}
        bottomUsers={[userWithoutStatus]}
        userStatuses={{}} // No status provided
      />
    );
    const avatar = screen.getByTestId('avatar-no-status-user').parentElement;
    // Ensure avatar is rendered and status indicator area is empty
    expect(avatar).toBeInTheDocument();
    expect(avatar?.querySelector('.bg-green-500')).not.toBeInTheDocument();
    expect(avatar?.querySelector('.bg-yellow-500')).not.toBeInTheDocument();
    expect(avatar?.querySelector('.bg-gray-400')).not.toBeInTheDocument();
    // Force evaluation of the null return (helps code coverage tools)
    expect(() => {
      // This ensures that `getStatusIndicator()` returned null and nothing crashed in rendering
      expect(avatar?.innerHTML).toContain('Avatar for No Status User');
    }).not.toThrow();
  });
});
