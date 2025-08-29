/* eslint-disable max-lines */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatUser } from '@/components/ChatPage';
import ChatHeader from '@/components/ChatHeader';

jest.mock('@/components/UnmatchButton', () => {
  return {
    __esModule: true,
    default: () => <button data-testid="unmatch-button">Unmatch</button>,
  };
});

jest.mock('@/components/ViewProfile', () => {
  return {
    __esModule: true,
    default: (_props: { user: ChatUser }) => <button data-testid="view-profile-button">View Profile</button>,
  };
});

jest.mock('@/components/Avatar', () => {
  return {
    __esModule: true,
    default: ({ user, size }: { user: ChatUser; size: number }) => (
      <div data-testid="avatar" data-user-name={user.name} data-size={size}>
        Avatar
      </div>
    ),
  };
});

describe('ChatHeader', () => {
  const mockUser: ChatUser = {
    id: '1',
    name: 'John',
    age: 28,
    profession: 'Software Engineer',
    images: ['photo1.jpg'],
    dateOfBirth: '1995-06-15',
    startedConversation: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chat header with user information', () => {
    render(<ChatHeader user={mockUser} />);

    // Check if the main container is rendered
    const header = screen.getByTestId('chat-header');

    expect(header).toBeInTheDocument();
  });

  it('displays user name and age correctly', () => {
    render(<ChatHeader user={mockUser} />);

    const nameAndAge = screen.getByText('John, 28');
    expect(nameAndAge).toBeInTheDocument();
    expect(nameAndAge).toHaveClass('text-[14px]', 'font-medium', 'text-gray-900');
  });

  it('displays user profession correctly', () => {
    render(<ChatHeader user={mockUser} />);

    const profession = screen.getByText('Software Engineer');
    expect(profession).toBeInTheDocument();
    expect(profession).toHaveClass('text-[14px]', 'text-gray-500');
  });

  it('renders Avatar component with correct props', () => {
    render(<ChatHeader user={mockUser} />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-user-name', 'John');
    expect(avatar).toHaveAttribute('data-size', '48');
  });

  it('renders ViewProfile component with user prop', () => {
    render(<ChatHeader user={mockUser} />);

    const viewProfileButton = screen.getByTestId('view-profile-button');
    expect(viewProfileButton).toBeInTheDocument();
  });

  it('renders UnmatchButton component', () => {
    render(<ChatHeader user={mockUser} />);

    const unmatchButton = screen.getByTestId('unmatch-button');
    expect(unmatchButton).toBeInTheDocument();
  });

  it('applies correct CSS classes to the main container', () => {
    render(<ChatHeader user={mockUser} />);

    const container = document.querySelector('.flex.items-center.justify-between.p-4.border-b.border-r.border-gray-200');
    expect(container).toBeInTheDocument();
  });

  it('applies correct CSS classes to user info section', () => {
    render(<ChatHeader user={mockUser} />);

    const userInfoSection = document.querySelector('.flex.items-center.gap-3');
    expect(userInfoSection).toBeInTheDocument();
  });

  it('applies correct CSS classes to buttons section', () => {
    render(<ChatHeader user={mockUser} />);

    const buttonsSection = document.querySelector('.flex.gap-2');
    expect(buttonsSection).toBeInTheDocument();
  });

  it('handles user with different data correctly', () => {
    const differentUser: ChatUser = {
      id: '2',
      name: 'Sarah',
      age: 25,
      profession: 'Designer',
      images: ['photo2.jpg'],
      dateOfBirth: '1998-03-20',
      startedConversation: false,
    };

    render(<ChatHeader user={differentUser} />);

    expect(screen.getByText('Sarah, 25')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('data-user-name', 'Sarah');
  });

  it('handles user with long profession name', () => {
    const userWithLongProfession: ChatUser = {
      id: '3',
      name: 'Michael',
      age: 30,
      profession: 'Senior Full Stack Developer and Product Manager',
      images: ['photo3.jpg'],
      dateOfBirth: '1993-11-10',
      startedConversation: true,
    };

    render(<ChatHeader user={userWithLongProfession} />);

    expect(screen.getByText('Senior Full Stack Developer and Product Manager')).toBeInTheDocument();
  });

  it('handles user with edge case ages', () => {
    const youngUser: ChatUser = {
      id: '4',
      name: 'Alex',
      age: 18,
      profession: 'Student',
      images: ['photo4.jpg'],
      dateOfBirth: '2005-08-25',
      startedConversation: false,
    };

    render(<ChatHeader user={youngUser} />);

    expect(screen.getByText('Alex, 18')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ChatHeader user={mockUser} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('John, 28');
    });

    it('maintains proper semantic structure', () => {
      render(<ChatHeader user={mockUser} />);

      // Check that buttons are properly rendered
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2); // ViewProfile and Unmatch buttons
    });
  });

  describe('component integration', () => {
    it('passes correct user data to child components', () => {
      const customUser: ChatUser = {
        id: '5',
        name: 'Emma',
        age: 26,
        profession: 'Marketing Manager',
        images: ['emma.jpg'],
        dateOfBirth: '1997-12-05',
        startedConversation: true,
      };

      render(<ChatHeader user={customUser} />);

      // Avatar should receive the user and size
      const avatar = screen.getByTestId('avatar');
      expect(avatar).toHaveAttribute('data-user-name', 'Emma');
      expect(avatar).toHaveAttribute('data-size', '48');

      // ViewProfile and UnmatchButton should be rendered
      expect(screen.getByTestId('view-profile-button')).toBeInTheDocument();
      expect(screen.getByTestId('unmatch-button')).toBeInTheDocument();
    });
  });
});
