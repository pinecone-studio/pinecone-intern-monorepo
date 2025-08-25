import { render, screen, fireEvent } from '@testing-library/react';
import ChatPerson from './ChatPerson';

const mockUsers = [
  { id: 1, name: 'John', age: 25, job: 'Engineer', avatar: ['/john.jpg'] },
  { id: 2, name: 'Alice', age: 30, job: 'Designer', avatar: ['/alice.jpg'] },
];

describe('ChatPerson Component', () => {
  it('renders all bottomUsers', () => {
    render(<ChatPerson selectedUser={null} onUserSelect={() => {}} bottomUsers={mockUsers} />);

    // Хэрэглэгчийн нэр+нас харагдах эсэх
    expect(screen.getByText('John, 25')).toBeInTheDocument();
    expect(screen.getByText('Alice, 30')).toBeInTheDocument();
  });

  it('calls onUserSelect when a user is clicked', () => {
    const handleSelect = jest.fn();

    render(<ChatPerson selectedUser={null} onUserSelect={handleSelect} bottomUsers={mockUsers} />);

    fireEvent.click(screen.getByText('Alice, 30'));
    expect(handleSelect).toHaveBeenCalledWith(mockUsers[1]);
  });

  it('highlights the selected user', () => {
    render(<ChatPerson selectedUser={mockUsers[0]} onUserSelect={() => {}} bottomUsers={mockUsers} />);

    const selectedName = screen.getByText('John, 25');
    expect(selectedName).toHaveClass('text-red-600');
  });

  it("shows 'Chatted' indicator for chatted users", () => {
    const chatted = new Set([2]); // Alice чатласан

    render(<ChatPerson selectedUser={null} onUserSelect={() => {}} bottomUsers={mockUsers} chattedUsers={chatted} />);

    expect(screen.getByText('● Chatted')).toBeInTheDocument();
  });
});
