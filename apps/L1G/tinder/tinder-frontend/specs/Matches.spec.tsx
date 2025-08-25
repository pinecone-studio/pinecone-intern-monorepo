
import { Matches } from '@/components/Matches';
import { render, screen, within } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom';
import Matches from '../src/components/Matches';

jest.mock('../src/components/Avatar', () => {
  const MockAvatar = ({ user }) => {
    return <div data-testid={`avatar-${user.id}`}>{user.name} Avatar</div>;
  };
  return MockAvatar;
});

const mockUsers = [
  { id: 1, name: 'Leslie', age: 25, job: 'Designer', avatar: ['avatar1.jpg'] },
  { id: 2, name: 'Eleanor', age: 30, job: 'Engineer', avatar: ['avatar2.jpg'] },
];

describe('Matches Component', () => {
  const mockOnUserSelect = jest.fn();
  const defaultProps = {
    topRowUsers: mockUsers,
    selectedUser: null,
    onUserSelect: mockOnUserSelect,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders users correctly', () => {
    render(<Matches {...defaultProps} />);

    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.getByText('Leslie, 25')).toBeInTheDocument();
    expect(screen.getByText('Eleanor, 30')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('handles user selection', () => {
    render(<Matches {...defaultProps} />);

    const userElement = screen.getByText('Leslie, 25');
    fireEvent.click(userElement.closest('div'));

    expect(mockOnUserSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('shows selected user styling', () => {
    const props = { ...defaultProps, selectedUser: mockUsers[0] };
    render(<Matches {...props} />);

    expect(screen.getByText('Leslie, 25')).toHaveClass('text-red-600');
    expect(screen.getByText('Eleanor, 30')).toHaveClass('text-black');
  });

  it('handles empty user list', () => {
    const props = { ...defaultProps, topRowUsers: [] };
    render(<Matches {...props} />);

    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.queryByText('Leslie, 25')).not.toBeInTheDocument();
  });
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../components/Avatar', () => {
  return ({ user, size }: any) => (
    <div data-testid={`avatar-${user.id}`} data-size={size} data-user={user.name}>
      Avatar for {user.name}
    </div>
  );
});

import Matches from '../components/Matches';

describe('Matches Component', () => {
  const mockUsers = [
    { id: 1, name: 'Alice', age: 25, job: 'Designer', avatar: ['profile.jpg'] },
    { id: 2, name: 'Bob', age: 28, job: 'Engineer', avatar: ['profile.jpg'] },
    { id: 3, name: 'Charlie', age: 30, job: 'Teacher', avatar: ['profile.jpg'] },
  ];

  const mockUsers = [
    { id: 1, name: 'Alice', age: 25, job: 'Designer', avatar: ['profile.jpg'] },
    { id: 2, name: 'Bob', age: 28, job: 'Engineer', avatar: ['profile.jpg'] },
    { id: 3, name: 'Charlie', age: 30, job: 'Teacher', avatar: ['profile.jpg'] },
  ];

  const defaultProps = {
    topRowUsers: mockUsers,
    selectedUser: null,
    onUserSelect: jest.fn(),
    onUserSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders root and inner containers correctly', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByTestId('matches-root')).toBeInTheDocument();
      expect(screen.getByTestId('matches-inner')).toHaveClass('max-w-[1280px]');
    });

    it('displays Matches title', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByText('Matches')).toHaveClass('text-[20px]', 'font-medium');
    });

    it('renders scrollable container', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByTestId('users-container')).toHaveClass('overflow-x-auto');
    });
  });

  describe('User Rendering', () => {
    it('renders all users', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByText('Alice, 25')).toBeInTheDocument();
      expect(screen.getByText('Bob, 28')).toBeInTheDocument();
      expect(screen.getByText('Charlie, 30')).toBeInTheDocument();
    });

    it('renders avatars with correct props', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByTestId('avatar-1')).toHaveAttribute('data-size', '40');
      expect(screen.getByTestId('avatar-1')).toHaveAttribute('data-user', 'Alice');
    });

    it('handles empty user list', () => {
      render(<Matches {...defaultProps} topRowUsers={[]} />);
      expect(screen.queryByText(/, \d+/)).not.toBeInTheDocument();
    });
  });

  describe('Selection Styling', () => {
    it('applies unselected styles by default', () => {
      render(<Matches {...defaultProps} />);
      const aliceName = screen.getByText('Alice, 25');
      expect(aliceName).toHaveClass('text-black');
    });

    it('applies selected styles when user is selected', () => {
      render(<Matches {...defaultProps} selectedUser={mockUsers[0]} />);
      const aliceName = screen.getByText('Alice, 25');
      expect(aliceName).toHaveClass('text-red-600');
    });
  });

  describe('Interactions', () => {
    it('calls onUserSelect when user is clicked', () => {
      const mockHandler = jest.fn();
      render(<Matches {...defaultProps} onUserSelect={mockHandler} />);
      fireEvent.click(screen.getByTestId('user-1'));
      expect(mockHandler).toHaveBeenCalledWith(mockUsers[0]);
    });
  });

  describe('Edge Cases', () => {
    it('handles long names gracefully', () => {
      const longUser = [{ id: 99, name: 'VeryLongNameThatMightCauseIssues', age: 99, job: 'Tester', avatar: [] }];
      render(<Matches {...defaultProps} topRowUsers={longUser} />);
      expect(screen.getByText('VeryLongNameThatMightCauseIssues, 99')).toBeInTheDocument();
    });
  });
});
