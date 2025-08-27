import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatUser } from '@/components/ChatPage';
import Matches from '@/components/Matches';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Alice',
    images: ['/alice.jpg'],
    dateOfBirth: '1997-05-10',
    profession: 'Engineer',
    age: 28,
    startedConversation: false,
  },
  {
    id: '2',
    name: 'Bob',
    images: ['/bob.jpg'],
    dateOfBirth: '1993-02-20',
    profession: 'Designer',
    age: 32,
    startedConversation: true,
  },
];

describe('Matches component', () => {
  it('renders all top row users', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    expect(screen.getByText('Alice, 28'));
    expect(screen.getByText('Bob, 32'));
    expect(screen.getByText('Engineer'));
    expect(screen.getByText('Designer'));
  });

  it('calls onUserSelect when a user is clicked', () => {
    const handleSelect = jest.fn();

    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={handleSelect} />);

    fireEvent.click(screen.getByText('Alice, 28'));

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(mockUsers[0]);
  });
  it('highlights the selected user in red when selected', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={mockUsers[1]} onUserSelect={jest.fn()} />);

    screen.getByText('Bob, 32');
  });
});
