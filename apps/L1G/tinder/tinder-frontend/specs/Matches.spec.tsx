/* eslint-disable react/function-component-definition */
/* eslint-disable max-lines */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Matches from '@/components/Matches';
import { ChatUser } from 'types/chat';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

jest.mock('@/components/Avatar', () => {
  return function MockAvatar({ user, width, height, className }: any) {
    return (
      <div data-testid={`avatar-${user.id}`} className={className} style={{ width, height }}>
        Avatar for {user.name}
      </div>
    );
  };
});

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
  it('renders the section title "New Matches"', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);
    expect(screen.getByText('New Matches')).toBeInTheDocument();
    expect(screen.getByText('New Matches')).toHaveClass('text-[20px]', 'font-semibold', 'py-4');
  });

  it('renders the likes section with +12 indicator', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);
    expect(screen.getByText('+12')).toBeInTheDocument();
    expect(screen.getByText('Likes')).toBeInTheDocument();

    const likesImage = screen.getByAltText('Someone liked you');
    expect(likesImage).toBeInTheDocument();
    expect(likesImage).toHaveClass('filter', 'blur-sm', 'brightness-75');
  });

  it('renders all top row users with their information', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    // Check if user names are rendered separately
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();

    // Check if avatars are rendered
    expect(screen.getByTestId('avatar-1')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-2')).toBeInTheDocument();
  });

  it('calls onUserSelect when a user is clicked', () => {
    const handleSelect = jest.fn();
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={handleSelect} />);

    // Click on Alice's container
    const aliceContainer = screen.getByTestId('avatar-1').closest('.flex.flex-col.items-center');
    fireEvent.click(aliceContainer!);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('applies correct styling to non-selected users', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    const aliceElement = screen.getByText('Alice');
    expect(aliceElement).toHaveClass('text-black');

    const aliceContainer = aliceElement.closest('.flex.flex-col.items-center');
    expect(aliceContainer).toHaveClass('opacity-80');
  });

  it('highlights the selected user in pink when selected', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={mockUsers[1]} onUserSelect={jest.fn()} />);

    const bobElement = screen.getByText('Bob');
    expect(bobElement).toHaveClass('text-pink-400');

    const bobContainer = bobElement.closest('.flex.flex-col.items-center');
    expect(bobContainer).toHaveClass('opacity-100');
  });

  it('applies hover effect to user items', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    const aliceContainer = screen.getByText('Alice').closest('.flex.flex-col.items-center');
    expect(aliceContainer).toHaveClass('hover:scale-105');
  });

  it('applies cursor-pointer to user items', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    const aliceContainer = screen.getByText('Alice').closest('.flex.flex-col.items-center');
    expect(aliceContainer).toHaveClass('cursor-pointer');
  });

  it('renders empty state when no users are provided', () => {
    render(<Matches topRowUsers={[]} selectedUser={null} onUserSelect={jest.fn()} />);

    // Should still render the section title and likes section
    expect(screen.getByText('New Matches')).toBeInTheDocument();
    expect(screen.getByText('Likes')).toBeInTheDocument();

    // But no user avatars or names
    expect(screen.queryByTestId('avatar-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('avatar-2')).not.toBeInTheDocument();
  });

  it('has correct container structure', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    // Main container
    const mainContainer = screen.getByText('New Matches').closest('.w-full.max-w-\\[1330px\\]');
    expect(mainContainer).toHaveClass('bg-white');

    // Inner container
    const innerContainer = mainContainer?.querySelector('.w-full.mx-auto.px-4');
    expect(innerContainer).toBeInTheDocument();

    // Users container
    const usersContainer = innerContainer?.querySelector('.flex.gap-4.pb-4.overflow-x-auto.scrollbar-hide');
    expect(usersContainer).toBeInTheDocument();
  });

  it('applies correct dimensions to user avatars', () => {
    render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={jest.fn()} />);

    const aliceAvatar = screen.getByTestId('avatar-1');
    expect(aliceAvatar).toHaveStyle({ width: '90px', height: '130px' });

    const aliceAvatarContainer = aliceAvatar.closest('.rounded-xl');
    expect(aliceAvatarContainer).toHaveClass('rounded-xl');
  });

  it('truncates long user names', () => {
    const userWithLongName: ChatUser = {
      id: '3',
      name: 'Alexander The Great',
      images: ['/alex.jpg'],
      dateOfBirth: '1990-01-01',
      profession: 'General',
      age: 35,
      startedConversation: false,
    };

    render(<Matches topRowUsers={[userWithLongName]} selectedUser={null} onUserSelect={jest.fn()} />);

    const nameElement = screen.getByText('Alexander The Great');
    expect(nameElement).toHaveClass('truncate', 'w-full');
  });

  it('handles multiple user selections correctly', () => {
    const handleSelect = jest.fn();
    const { rerender } = render(<Matches topRowUsers={mockUsers} selectedUser={null} onUserSelect={handleSelect} />);

    // Select Alice
    const aliceContainer = screen.getByTestId('avatar-1').closest('.flex.flex-col.items-center');
    fireEvent.click(aliceContainer!);
    expect(handleSelect).toHaveBeenCalledWith(mockUsers[0]);

    // Select Bob
    rerender(<Matches topRowUsers={mockUsers} selectedUser={mockUsers[1]} onUserSelect={handleSelect} />);
    const bobContainer = screen.getByTestId('avatar-2').closest('.flex.flex-col.items-center');
    fireEvent.click(bobContainer!);
    expect(handleSelect).toHaveBeenCalledWith(mockUsers[1]);
  });
});
