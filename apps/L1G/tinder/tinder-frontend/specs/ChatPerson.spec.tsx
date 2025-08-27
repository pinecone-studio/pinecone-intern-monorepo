/* eslint-disable react/function-component-definition */

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatPerson from '@/components/ChatPerson';
import { ChatUser } from '@/components/ChatPage';

jest.mock('clsx', () => {
  return (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');
});

/* eslint-disable-next-line react/display-name */
jest.mock('@/components/Avatar', () => ({ user, size }: any) => (
  <div data-testid={`avatar-${user.id}`} data-size={size}>
    Avatar for {user.name}
  </div>
));

// ✅ Use proper shape for ChatUser
const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 25,
    profession: 'Developer',
    images: ['/john.jpg'],
    dateOfBirth: '1998-04-12',
    startedConversation: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 28,
    profession: 'Designer',
    images: ['/jane.jpg'],
    dateOfBirth: '1995-06-22',
    startedConversation: true,
  },
  {
    id: '3',
    name: 'Bob Wilson',
    age: 32,
    profession: 'Manager',
    images: ['/bob.jpg'],
    dateOfBirth: '1991-01-01',
    startedConversation: false,
  },
];

describe('ChatPerson', () => {
  const defaultProps = {
    selectedUser: null,
    onUserSelect: jest.fn(),
    bottomUsers: mockUsers,
    chattedUsers: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all users from bottomUsers', () => {
    render(<ChatPerson {...defaultProps} />);
    expect(screen.getByText('John Doe, 25')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith, 28')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson, 32')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
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
    fireEvent.click(screen.getByText('John Doe, 25'));
    expect(onUserSelect).toHaveBeenCalledTimes(1);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('shows normal styling for non-selected users', () => {
    render(<ChatPerson {...defaultProps} selectedUser={mockUsers[0]} />);
    const nonSelectedUser = screen.getByText('Jane Smith, 28');
    const container = nonSelectedUser.closest('div');
    expect(nonSelectedUser.className).toContain('text-black');
    expect(container?.className).not.toContain('bg-gray-200');
  });

  it('handles chattedUsers set correctly', () => {
    const chattedUsers = new Set(['1', '2']);
    render(<ChatPerson {...defaultProps} chattedUsers={chattedUsers} />);
    expect(screen.getByText('John Doe, 25')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith, 28')).toBeInTheDocument();
    expect(screen.getByText('Bob Wilson, 32')).toBeInTheDocument();
  });

  it('handles undefined chattedUsers prop safely', () => {
    render(<ChatPerson {...defaultProps} chattedUsers={undefined} />);
    expect(screen.getByText('Bob Wilson, 32')).toBeInTheDocument();
  });

  it('renders empty state when bottomUsers is empty', () => {
    render(<ChatPerson {...defaultProps} bottomUsers={[]} />);
    const container = document.querySelector('.flex.flex-col.w-\\[300px\\].border-r.border-gray-300');
    expect(container?.children.length).toBe(0);
  });

  it('calls onUserSelect multiple times on same user', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);
    const user = screen.getByText('John Doe, 25');
    fireEvent.click(user);
    fireEvent.click(user);
    expect(onUserSelect).toHaveBeenCalledTimes(2);
    expect(onUserSelect).toHaveBeenNthCalledWith(1, mockUsers[0]);
    expect(onUserSelect).toHaveBeenNthCalledWith(2, mockUsers[0]);
  });

  it('calls onUserSelect for different users correctly', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);
    fireEvent.click(screen.getByText('John Doe, 25'));
    fireEvent.click(screen.getByText('Jane Smith, 28'));
    expect(onUserSelect).toHaveBeenCalledTimes(2);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[1]);
  });
});
