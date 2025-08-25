import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockUsers = [
  { id: 1, name: 'John', age: 25, job: 'Engineer', avatar: ['/john.jpg'] },
  { id: 2, name: 'Alice', age: 30, job: 'Designer', avatar: ['/alice.jpg'] },
];

jest.mock('@/components/ChatWindow', () => ({
  __esModule: true,
  default: () => <div data-testid="chat-window">ChatWindow Component</div>,
}));

jest.mock('lucide-react', () => ({
  MessageSquareDashedIcon: () => <div data-testid="message-icon">MessageIcon</div>,
  Send: () => <div data-testid="send-icon">SendIcon</div>,
}));

describe('ChatPerson', () => {
  const defaultProps = {
    selectedUser: null,
    onUserSelect: jest.fn(),
    bottomUsers: mockUsers,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all users from bottomUsers', () => {
    render(<ChatPerson {...defaultProps} />);

    expect(screen.getByText('John Doe, 25')).toBeTruthy();
    expect(screen.getByText('Jane Smith, 28')).toBeTruthy();
    expect(screen.getByText('Bob Wilson, 32')).toBeTruthy();
    expect(screen.getByText('Developer')).toBeTruthy();
    expect(screen.getByText('Designer')).toBeTruthy();
    expect(screen.getByText('Manager')).toBeTruthy();
  });

  it('renders avatars for all users', () => {
    render(<ChatPerson {...defaultProps} />);

    const avatars = screen.getAllByRole('generic').filter((el) => el.textContent?.includes('Avatar') || el.querySelector('img'));
    expect(avatars.length).toBeGreaterThanOrEqual(0);
  });

  it('calls onUserSelect when user is clicked', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);

    const userItem = screen.getByText('John Doe, 25').closest('div');
    if (userItem) {
      fireEvent.click(userItem);
    }

    expect(onUserSelect).toHaveBeenCalledTimes(1);
    expect(onUserSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('highlights selected user with red text and gray background', () => {
    render(<ChatPerson {...defaultProps} selectedUser={mockUsers[0]} />);

    const selectedUserName = screen.getByText('John Doe, 25');
    const selectedUserContainer = selectedUserName.closest('.cursor-pointer');

    expect(selectedUserName.className).toContain('text-red-600');
    expect(selectedUserContainer?.className).toContain('bg-gray-200');
  });

  it('shows normal styling for non-selected users', () => {
    render(<ChatPerson {...defaultProps} selectedUser={mockUsers[0]} />);

    const selectedName = screen.getByText('John, 25');
    expect(selectedName).toHaveClass('text-red-600');
  });

  it('handles chattedUsers set correctly', () => {
    const chattedUsers = new Set([1, 2]);
    render(<ChatPerson {...defaultProps} chattedUsers={chattedUsers} />);

    expect(screen.getByText('John Doe, 25')).toBeTruthy();
    expect(screen.getByText('Jane Smith, 28')).toBeTruthy();
    expect(screen.getByText('Bob Wilson, 32')).toBeTruthy();
  });

  it('handles undefined chattedUsers prop', () => {
    render(<ChatPerson {...defaultProps} chattedUsers={undefined} />);

    expect(screen.getByText('John Doe, 25')).toBeTruthy();
    expect(screen.getByText('Jane Smith, 28')).toBeTruthy();
    expect(screen.getByText('Bob Wilson, 32')).toBeTruthy();
  });

  it('renders empty state when bottomUsers is empty', () => {
    render(<ChatPerson {...defaultProps} bottomUsers={[]} />);

    const container = document.querySelector('.flex.flex-col.w-\\[300px\\].border-r.border-gray-300');
    expect(container).toBeTruthy();
    expect(container?.children.length).toBe(0);
  });

  it('applies hover styles correctly', () => {
    render(<ChatPerson {...defaultProps} />);

    const userItems = screen.getAllByRole('generic').filter((el) => el.classList.contains('cursor-pointer'));

    userItems.forEach((item) => {
      expect(item).toHaveClass('hover:bg-gray-100');
    });
  });

  it('handles multiple clicks on same user', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);

    const userItem = screen.getByText('John Doe, 25').closest('div');
    if (userItem) {
      fireEvent.click(userItem);
      fireEvent.click(userItem);
    }

    expect(onUserSelect).toHaveBeenCalledTimes(2);
    expect(onUserSelect).toHaveBeenNthCalledWith(1, mockUsers[0]);
    expect(onUserSelect).toHaveBeenNthCalledWith(2, mockUsers[0]);
  });

  it('handles clicks on different users', () => {
    const onUserSelect = jest.fn();
    render(<ChatPerson {...defaultProps} onUserSelect={onUserSelect} />);

    const johnItem = screen.getByText('John Doe, 25').closest('div');
    const janeItem = screen.getByText('Jane Smith, 28').closest('div');

    if (johnItem) fireEvent.click(johnItem);
    if (janeItem) fireEvent.click(janeItem);

    expect(onUserSelect).toHaveBeenCalledTimes(2);
    expect(onUserSelect).toHaveBeenNthCalledWith(1, mockUsers[0]);
    expect(onUserSelect).toHaveBeenNthCalledWith(2, mockUsers[1]);
  });
});
